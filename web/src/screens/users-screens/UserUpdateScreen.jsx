import React from "react";
import UpdateUser from "../../components/users/update-user/UpdateUser";
import Section from "../../components/section/Section"

function UserUpdateScreen() {
  return (
    <div>
      <Section title="Update your personal data" icon="check-circle">
        <UpdateUser />
      </Section>
    </div>
  );
}

export default UserUpdateScreen;
