<template lang="html">

  <div class="container-scroller page-body-wrapper full-page-wrapper ">
    <div class="content-wrapper d-flex align-items-center auth auth-bg-1 theme-one">
      <div class="row w-100">
        <div class="col-lg-4 mx-auto">
          <section class="login w-100">
            <div class="wrapper d-flex align-items-center auth login-full-bg">
              <div class="row w-100">
                <div class="col-lg-12 mx-auto">
                  <div class="auth-form-dark text-left p-5">
                    <div class="text-center navbar-brand-wrapper d-flex align-items-top justify-content-center">
                      <div class="navbar-brand brand-logo">
                        <img src="../assets/images/top-logo.png" alt="logo">
                      </div>
                    </div>
                    <!--<div id="errorMessage" class="error-message"></div>-->
                    <form id="loginForm" autocomplete="off" class="pt-5">
                      <form @submit.prevent="login" autocomplete="off">
                        <div class="form-group">
                          <label for="username">Username</label>
                          <input type="text" class="form-control" v-model="username" autocomplete="off" id="username" name="username" aria-describedby="emailHelp" placeholder="Username">
                          <i class="mdi mdi-account"></i>
                        </div>
                        <div class="form-group">
                          <label for="password">Password</label>
                          <input type="password" class="form-control" v-model="password" name="new-password" autocomplete="off" id="password" placeholder="Password">
                          <i class="mdi mdi-eye"></i>
                        </div>
                        <div class="mt-5">
                          <button class="btn btn-block btn-primary btn-lg font-weight-medium" type="submit">Login</button>
                        </div>
                        <!--<div class="mt-3 text-center">-->
                          <!--<a href="#" class="auth-link text-white">Forgot password?</a>-->
                        <!--</div>-->

                      </form>
                    </form>
                  </div>
                  <ul class="auth-footer">
                    <li>
                      <a href="#">Conditions</a>
                    </li>
                    <li>
                      <a href="#">Contact us</a>
                    </li>
                    <li>
                      <a href="#">Terms</a>
                    </li>
                  </ul>
                  <p class="footer-text text-center auth-link text-white">copyright © 2019 DimaTech. All rights reserved.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang='js'>
export default {
	name: 'login',
	data() {
		return {
			username: "",
			password: ""
		}
	},
	methods: {
		login: function(event) {
			let router = this.$router;
			let request = new XMLHttpRequest();
			// let error = this.showErrorMessage(event);
			request.onreadystatechange = function(v) {
				if (request.readyState == 4) {
                    switch (request.status) {
                        case(403):
                          // console.log(111)  ;
                          // alert('Account or Password is incorrect!');
                          v.showErrorMessage(event);
                          break;
                        case(200):
                          localStorage.setItem('token', request.response.token);
                          localStorage.setItem('username', request.response.username);
                          localStorage.setItem('apiKey', request.response.apiKey);
                          localStorage.setItem('role', request.response.role);
                          router.push({ path: '/' });
                          break;
                        default:
                          v.showErrorMessage(event);
                          break;
                    }
				}
			}.bind(request, this);
			request.open('POST', `${Host}/login`);
			request.responseType = 'json';
			request.setRequestHeader('Content-Type', 'application/json');
			request.send(JSON.stringify({ username: this.username, password: this.password }));
		},
        showErrorMessage: function () {
            this.$message({
                showClose: true,
                message: 'Account or Password is incorrect!',
                type: 'error'
            });
            // let message = document.getElementById('errorMessage');
            // message.innerText = '';
            // event.preventDefault();
            // message.classList.add('show-massage');
            // message.innerText = 'Account or Password is incorrect!';
            //
            // setTimeout(function () {
            //     message.classList.remove('show-massage');
            //     message.innerText = ' ';
            // }, 5000)
        },
	}
}
</script>


<style scoped lang="scss">
.auth-bg-1 {
  background: url("../assets/images/bg-baner-tablet.png") no-repeat;
  -webkit-background-size: cover;
  background-size: cover;
}
.auth-footer {
  list-style-type: none;
  padding-left: 0;
  margin-top: 20px;
  margin-bottom: 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  padding-left: 1rem;
  font-size: 0.875rem;

  li {
    margin-right: 10px;
    line-height: 1;
    padding-right: 10px;
    border-right: 1px solid rgba(255, 255, 255, 0.4);

    a {
      font-size: 13px;
      color: rgba(255, 255, 255, 1);
    }
  }
}
  /*.error-message {*/
    /*position: absolute;*/
    /*top: 0;*/
    /*right: 0;*/
    /*left: 0;*/
    /*width: 80%;*/
    /*margin: auto;*/
    /*opacity: 0;*/
    /*background-color: #fef0f0;*/
    /*color: #f56c6c;*/
    /*text-align: center;*/
    /*padding: 5px;*/
    /*border-radius: 50px;*/
    /*box-sizing: border-box;*/
    /*border: 1px solid #f56c6c;*/
    /*transition: opacity 0.4s;*/

    /*&.show-massage {*/
      /*opacity: 1;*/
      /*transition: opacity 0.4s;*/
    /*}*/
  /*}*/
</style>