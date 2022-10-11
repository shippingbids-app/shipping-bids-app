import React from "react";
import RegisterForm from "../../components/register-form/RegisterForm";
import Section from "../../components/section/Section";

function RegisterScreen() {
  return (
    <>
      <Section title="Register" icon="pencil-square-o">
        <RegisterForm />
      </Section>
    </>
  );
}

export default RegisterScreen;
