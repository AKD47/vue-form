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
                        <img src="../../assets/images/top-logo.png" alt="logo">
                      </div>
                    </div>
                    <form class="pt-5">
                      <form>
                        <div class="form-group">
                          <label for="exampleInputEmail1">Username</label>
                          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username">
                          <i class="mdi mdi-account"></i>
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">Password</label>
                          <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                          <i class="mdi mdi-eye"></i>
                        </div>
                        <div class="mt-5">
                          <a class="btn btn-block btn-primary btn-lg font-weight-medium" href="../../index.html">Login</a>
                        </div>
                        <div class="mt-3 text-center">
                          <a href="#" class="auth-link text-white">Forgot password?</a>
                        </div>
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

<script lang="js">
export default {
  name: 'login'
}
</script>

<style scoped lang="scss">
.login {

}
.auth-bg-1 {
  background: url("../../assets/images/bg-baner-tablet.png") no-repeat;
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
</style>
