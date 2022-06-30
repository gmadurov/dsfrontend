export const LoginPage = ({}) => {
  return (
    <>
      <div className="container">
        <form className="form" action="" method="POST" style="">
          <div className="columns is-gapless">
            <div
              className="column is-4"
              style="text-align: center; padding: 15px"
            >
              <div className="text" style="padding-top: 10px">
                Login
              </div>
              <div
                className="text"
                style="padding-top: 0px; padding-right: 0px"
              >
                Password
              </div>
            </div>
            <div className="column is-8">
              <div style="padding-top: 15px; padding-bottom: 0px">
                <input
                  style="width: 75%"
                  type="text"
                  name="username"
                  id="formInput#text"
                  placeholder="STROPDAS"
                />
              </div>
              <div style="padding-top: 0px">
                <input
                  style="width: 75%"
                  type="password"
                  name="password"
                  id="formInput#passowrd"
                  placeholder="••••••••"
                />
              </div>
              <input
                className="btn"
                style="width: 75%;padding-bottom; 20px;"
                type="submit"
                value="Log in"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default LoginPage;
