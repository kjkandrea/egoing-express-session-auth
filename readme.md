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
}))
```

#### secret

**필수 옵션**. 시크릿 키를 지정한다. 해당 키는 노출되지않도록 실제로 사용할때는 다음 지침을 준수한다.

* 변수를 이용하여 `secret`을 저장하여 repo에 키가 올라가지 않게한다.
* 키를 정기적으로 업데이트한다.