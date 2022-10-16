import React from "react";
import ServiceForm from "../../components/ship-services/service-form/ServiceForm";
import Section from "../../components/section/Section";

function ServiceCreateFormScreen() {
  return (
    <>
      <Section title="Your available services" icon="truck">
        <ServiceForm />
      </Section>
    </>
  );
}

export default ServiceCreateFormScreen;
