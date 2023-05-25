import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn, refreshTokens } from '../../redux/auth/authService';
import { string, object } from 'yup';
import { iconClose, iconOpen, IconCrossSmall, IconCheck } from './Icons/Icons';
// import { setAuthHeader } from 'redux/auth/utility/authUtility';
import {
  Wrapper,
  Input,
  IconMail,
  IconPass,
  LoginFormStyled,
  Title,
  Box,
  Button,
  Text,
  Span,
  Link,
  EmailMessage,
  PasswordMessage,
  SuccessMessage,
} from './LoginForm.styled';
import { refreshingTokensExecutor } from 'helpers/refreshingTokensExecutor';

export const LoginForm = () => {
  const [toggleIconPass, setToggleIconPass] = useState(iconClose);
  const [typePass, setTypePass] = useState('password');
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // ACHTUNG
  // THIS useEffect is created ONLY AS AN EXAMPLE!!!!!
  useEffect(() => {
    // IIEF async func or named async func which doing request to some endpoints
    (async () => {
      try {
        // only the catch block trigger
        const exampleONLY = new Promise((resolve, reject) => {
          reject();
        });
        exampleONLY();
        // const resp = await  functionToRequestSomeData()
        // other logic...
        // if access token has expired the server send 403 error and the catch block will be triggered.
      } catch (error) {
        /** //refreshingTokensExecutor//
         *  @param {error}
         * catch error body
         * @param { dispatch} *link to the dispatch
         * @param { action} *an action that using in dispatch, like "dispatch(someAction())"
         */
        refreshingTokensExecutor({
          error: {
            // This path is an EXAMPLE ONLY , send ONLY the catch error obj in the arguments of this func!!!
            response: { data: { code: 403, message: 'expired' } },
          },
          dispatch,
          action: refreshTokens,
        });
        // console.log(result); // if error 403 result would be "expired" (type String) and you could do some logic if you want
        // if error has  any codes except 403 the result would be "error" (type Object)!!
      }
    })();

    // dispatch(refreshTokens());
  }, [dispatch]);

  const yupLoginValidation = object().shape({
    email: string().email('Enter a Valid Email').required('Email is Required'),
    password: string()
      .required('Enter Your Password')
      .min(6, 'Password should be minimum 6 character')
      .max(16, 'Too long')
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,16}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and be 6-16 characters long'
      ),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (values, { resetForm }) => {
    dispatch(logIn({ values }));
    navigate('/user');
    resetForm();
  };

  const togglePassInput = e => {
    if (typePass === 'password') {
      setTypePass('text');
      setToggleIconPass(iconOpen);
    } else {
      setTypePass('password');
      setToggleIconPass(iconClose);
    }
  };

  return (
    <Wrapper>
      <Formik
        initialValues={initialValues}
        validationSchema={yupLoginValidation}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <LoginFormStyled>
            <Title>Login</Title>
            <Box>
              <Input
                type="text"
                name="email"
                placeholder="Email"
                valid={touched.email && !errors.email ? 'true' : undefined}
                error={touched.email && errors.email}
              />
              <ErrorMessage
                name="email"
                type="email"
                render={msg => <EmailMessage>{msg}</EmailMessage>}
              />
              {errors.email && touched.email && (
                <IconMail error={errors.email && touched.email && 'false'}>
                  <IconCrossSmall />
                </IconMail>
              )}
              {touched.email && !errors.email && (
                <IconMail error={errors.email && touched.email && 'false'}>
                  <IconCheck />
                </IconMail>
              )}
              <Input
                type={typePass}
                name="password"
                placeholder="Password"
                valid={
                  touched.password && !errors.password ? 'true' : undefined
                }
                error={touched.password && errors.password}
              />
              {touched.password && errors.password && (
                <ErrorMessage
                  name="password"
                  type="password"
                  render={password => (
                    <PasswordMessage>{password}</PasswordMessage>
                  )}
                />
              )}{' '}
              {touched.password && !errors.password && (
                <SuccessMessage>Password is secure</SuccessMessage>
              )}
              {touched.password && !errors.password && (
                <IconPass
                  position={'40px'}
                  error={errors.password && touched.password && 'false'}
                >
                  <IconCheck />
                </IconPass>
              )}
              <IconPass onClick={togglePassInput}>{toggleIconPass}</IconPass>
            </Box>
            <Button type="submit">Login</Button>
            <Text>
              Don't have an account?
              <Span>
                <Link to="/register">Register</Link>
              </Span>
            </Text>
          </LoginFormStyled>
        )}
      </Formik>
    </Wrapper>
  );
};
