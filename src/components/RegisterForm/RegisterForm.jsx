import React from 'react';
import { useState } from 'react';
import { Wrapper, Form } from './RegisterForm.styled';
import {
  Input,
  Title,
  Box,
  Button,
  Text,
  Span,
  Link,
} from './RegisterForm.styled';

export const RegisterForm = () => {
  const [toggleIconPass, setToggleIconPass] = useState('☠️');
  const [toggleIconConfirm, setToggleIconConfirm] = useState('☠️');
  const [typePass, setTypePass] = useState('password');
  const [typeCofirm, setTypeCofirm] = useState('password');

  const togglePassInput = e => {
    if (typePass === 'password') {
      setTypePass('text');
      setToggleIconPass('💀');
    } else {
      setTypePass('password');
      setToggleIconPass('☠️');
    }
  };

    const toggleConfirmInput = e => {
    if (typeCofirm === 'password') {
      setTypeCofirm('text');
      setToggleIconConfirm('💀');
    } else {
      setTypeCofirm('password');
      setToggleIconConfirm('☠️');
    }
  };

  return (
    <Wrapper>
      <Form>
        <Title>Registation</Title>
        <Box>
          <Input type="text" name="email" placeholder="Email" />
          <Input type={typePass} name="password" placeholder="Password" />
          <span onClick={togglePassInput}>{toggleIconPass}</span>
          <Input
            type={typeCofirm}
            name="confirm"
            placeholder="Confirm password"
          />
          <span onClick={toggleConfirmInput}>{toggleIconConfirm}</span>
        </Box>
        <Button>Registation</Button>
        <Text>
          Already have an account?
          <Span>
            <Link to="/login">Login</Link>
          </Span>
        </Text>
      </Form>
    </Wrapper>
  );
};


// switch (e.target.name) {
//       case 'name':
//         setName(e.target.value);
//         break;
//       case 'number':
//         setNumber(e.target.value);
//         break;
//       default:
//         return;
//     }
