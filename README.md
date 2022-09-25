# 게시판 만들기

/ -> Home  
/join -> Join  
/login -> Login  
/search -> Search

/users/my_profile -> User Profile
/users/:id/edit -> User Edit  
/users/:id/delete -> User Delete

/board/:id -> Read a board  
/board/:id/edit -> Make a board  
/board/:id/delete -> Delete a board  
/board/:id/upload -> Upload a board  
/board/:id/comments -> Board comment
/board/:id/comments/delete -> Board comment delete

---

## 사용도구

- express, babel, nodemon, morgan, dotenv, bcrypt
- express-session, connect-mongo(MongoStore), node-fetch(2.6.1)
- pug
- mongoDB & mongoose

---

## velog

###### 220914 install 및 서버, View, Controller 생성

###### 220915 Model 생성 및 회원가입 구현

###### 220916 비밀번호 해싱, 로그아웃

###### 220916 Github OAuth 로그인 로그아웃 구현

###### 220917 Kakao OAuth 로그인 구현

###### 220919 회원정보 수정, 비밀번호 변경

###### 220922 글쓰기 템플릿 작성 및 model 수정

###### 220923 게시글 업로드 추가 및 Board, User model 수정

###### 220924 글 보기 페이지, 게시글 삭제

###### 220925 게시글 조회수, 게시글 만든시간, 댓글 model 생성

###### 220926 댓글 생성
