import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSignInRequestMutation } from "../../../redux/api/authApi";
import { Alert } from "antd";
import { useDispatch } from "react-redux";
import { signIn } from "../../../redux/slices/authSlice";

const Signin = () => {
  const [signInRequest, { data, isSuccess, isError, error, isLoading }] = useSignInRequestMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const login = event.target.login.value;
    const password = event.target.password.value;
    signInRequest({ login, password });
  };

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("token", data.token);
      dispatch(signIn(data.token));
      navigate(`/`);
    }
  }, [isSuccess, data, navigate, dispatch]);

  return (
    <div className="flex flex-col justify-center">
      {isError && error?.data?.message ? (
        <Alert
          className="flex items-center top-2 left-2/4 translate-x-[-50%] absolute"
          message={error.data.message}
          type="error"
          closable
          showIcon
        />
      ) : null}

      {isSuccess ? (
        <Alert
          className="flex items-center top-2 left-2/4 translate-x-[-50%] absolute"
          message={`You are logged in as ${data?.user?.login}`}
          closable
          type="success"
          showIcon
        />
      ) : null}
      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-10 h-[70vh] flex flex-col justify-center">
          <div>
            <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">Login to your account</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
            <div className="rounded-md  flex flex-col gap-4">
              <div className="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300" />
              <div>
                <label htmlFor="login" className="sr-only">
                  Login
                </label>
                <input
                  id="login"
                  name="login"
                  type="text"
                  required
                  autoComplete="username"
                  className="relative block p-4 w-full rounded-md border-0 py-1.5 text-gray-900 focus:outline-gray-800 outline-none ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  placeholder="Login"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block p-4 w-full rounded-md border-0 py-1.5 text-gray-900 focus:outline-gray-800 outline-none ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                disabled={isLoading ? true : false}
                type="submit"
                className={`${
                  isLoading ? "bg-gray-500" : ""
                } flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {isLoading ? (
                  <div
                    className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                      Loading...
                    </span>
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;