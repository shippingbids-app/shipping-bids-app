import React from "react";
import RegisterForm from "../../components/users/register-form/RegisterForm";
import Section from "../../components/section/Section";

function RegisterScreen() {
  return (
    <div className="mt-3">
      <Section title="Register" icon="pencil-square-o">
        <RegisterForm/>
      </Section>
    </div>
  );
}

export default RegisterScreen;
