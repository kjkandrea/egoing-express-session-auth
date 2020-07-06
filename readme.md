# Express Session & Auth 

## 세션이란?

세션은 방문자의 요청에 따른 정보를 방문자 메모리에 저장하는 것이 아닌, 웹 서버가 세션 아이디 파일을 만들어 서비스가 돌아가고 있는 서버에 저장을 하는것을 말한다.

## express-session

### Install

```
npm install express-session -s
```

### How To Use

`// Something` 에 들어갈 메소드들을 살펴보자.

``` javascript
var express = require('express')
var session = require('express-session')

var app = express()

app.use(session({
  // Something

  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
```

#### secret

**필수 옵션**. 시크릿 키를 지정한다. 해당 키는 노출되지않도록 실제로 사용할때는 다음 지침을 준수한다.

* 변수를 이용하여 `secret`을 저장하여 repo에 키가 올라가지 않게한다.
* 키를 정기적으로 업데이트한다.

### resave

`resave: true`: 값이 바뀌었건, 바뀌지 않았건 계속 저장소에 저장 한다.

### saveUninitialized

*`saveUninitialized: true`: 세션이 필요하기 전까지는 세션을 구동하지않는다.
*`saveUninitialized: false`: 무조건 세션을 구동한다. (서버에 큰 부담을 줄 수 있음)

### view수를 카운팅하는 코드

아래의 코드는 `session.num`이란 값을 세션에 만들어 view수를 카운팅하는 코드이다.
페이지를 리로드할때마다 `session.num`이 증가하여 응답에 표시된다.

``` javascript 
var express = require('express')
var session = require('express-session')

var app = express()

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.get('/', function (req, res, next) {
  let viewCount = req.session.num;
  if(req.session.num === undefined){
    req.session.num = 1;
  } else {
    req.session.num += 1;
  }
  res.send(`View : ${req.session.num}`);
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000')
})
```

하지만 서버가 종료되면 `session.num`은 휘발된다.
서버의 상태와 상관없이 세션정보를 유지할 수 있도록 세션 정보를 데이터베이스나 파일에 보관할 수 있지않을까?

### session-file-store

session-file-store는 express-session의 서드파티 모듈이다.
이 모듈은 root 디렉토리 하위에 sessions란 디렉토리를 만들어 세션 데이터를 저장한다.

아래의 코드를 적용하면 세션정보가 파일로 만들어져 서버가 종료되었다가 재 실행되어도 `session.num`이 유지되는것을 볼 수 있다.

``` javascript
var express = require('express')
var session = require('express-session')
var FileStore = require('session-file-store')(session)

var app = express()

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}))

app.get('/', function (req, res, next) {
  if(req.session.num === undefined){
    req.session.num = 1;
  } else {
    req.session.num += 1;
  }
  res.send(`View : ${req.session.num}`);
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000')
})
```

### session.destroy(callback)

세션을 삭제하고 req.session 속성을 설정 해제한다.
삭제되고나면 인자로 받은 callback이 호출된다.

``` javascript
req.session.destroy(function(err) {
  // Something
})
```

### session.save(callback)

세션을 저장하고 나서 실행되어야하는 동작은 callback에 담아주면 된다. 

아래는 로그인이 되었을 때 **로그인이 되었음을 세션에 먼저 기록하고** 그 후 리다이렉션을 시키는 코드이다.

``` javascript
req.session.is_logged_in = true
req.session.save(() => {
  res.redirect(`/`);
});
```

위의 사례에서 만일 `session.save(callback)` 로 비동기처리를 하지않는다면 redirect가 되었음에도 세션이 저장되지않아 **redirect가 되었으나 로그인이 지연되는** 상황이 발생할 수 있다.


## 인증 구현

### UI 만들기

### 로그인 세션 구현

### 세션 미들웨어 설치

### 인증 상태를 UI에 반영

### 로그인 상태 UI를 반영

### 로그아웃

### 접근 제어 (Create, Update, Delete)

### 세션 저장