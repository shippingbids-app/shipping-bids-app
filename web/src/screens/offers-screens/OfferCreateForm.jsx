import React from 'react'
import Section from '../../components/section/Section'
import OfferForm from '../../components/offers/offer-form/OfferForm'

function OfferCreateForm() {
  return (
    <div className='mt-3'>
      <Section title="Register an offer" icon="archive">
        <OfferForm />
      </Section>
    </div>
  )
}

export default OfferCreateForm