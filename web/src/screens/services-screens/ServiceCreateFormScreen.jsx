import React from "react";
import ServiceForm from "../../components/ship-services/service-form/ServiceForm";
import Section from "../../components/section/Section";

function ServiceCreateFormScreen() {
  return (
    <div className="mt-3">
      <Section title="Your available services" icon="truck">
        <ServiceForm />
      </Section>
    </div>
  );
}

export default ServiceCreateFormScreen;
