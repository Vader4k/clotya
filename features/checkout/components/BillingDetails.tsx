"use client"

import { Input } from '@/components/ui/input'
import { useFormContext } from 'react-hook-form'
import { BillingDetailsType } from '../schema/checkout.schema'

const BillingDetails = () => {
  const { register, formState: { errors } } = useFormContext<BillingDetailsType>()


  return (
    <div className='w-full h-fit flex flex-col gap-4'>
      <h3 className='text-lg font-medium'>Billing details</h3>
      <div className='flex flex-col gap-1'>
        <label htmlFor="firstName" className='text-sm'>First name *</label>
        <Input id='firstName' type='text' {...register('firstName')} className='rounded-none py-5 mt-2 focus:outline-none focus-visible:ring-0 ' />
        {errors.firstName && <span className='text-red-500'>{errors.firstName.message}</span>}
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="lastName" className='text-sm'>Last name *</label>
        <Input id='lastName' type='text' {...register('lastName')} className='rounded-none py-5 mt-2 focus:outline-none focus-visible:ring-0 ' />
        {errors.lastName && <span className='text-red-500'>{errors.lastName.message}</span>}
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="company" className='text-sm'>Company name (optional)</label>
        <Input id='company' type='text' {...register('company')} className='rounded-none py-5 mt-2 focus:outline-none focus-visible:ring-0 ' />
        {errors.company && <span className='text-red-500'>{errors.company.message}</span>}
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="country" className='text-sm'>Country / Region *</label>
        <Input id='country' type='text' {...register('country')} className='rounded-none py-5 mt-2 focus:outline-none focus-visible:ring-0 ' />
        {errors.country && <span className='text-red-500'>{errors.country.message}</span>}
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="address" className='text-sm'>Street address *</label>
        <Input id='address' type='text' {...register('address')} className='rounded-none py-5 mt-2 focus:outline-none focus-visible:ring-0 ' />
        {errors.address && <span className='text-red-500'>{errors.address.message}</span>}
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="city" className='text-sm'>Town / City *</label>
        <Input id='city' type='text' {...register('city')} className='rounded-none py-5 mt-2 focus:outline-none focus-visible:ring-0 ' />
        {errors.city && <span className='text-red-500'>{errors.city.message}</span>}
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="state" className='text-sm'>State *</label>
        <Input id='state' type='text' {...register('state')} className='rounded-none py-5 mt-2 focus:outline-none focus-visible:ring-0 ' />
        {errors.state && <span className='text-red-500'>{errors.state.message}</span>}
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="zip" className='text-sm'>ZIP code *</label>
        <Input id='zip' type='text' {...register('zip')} className='rounded-none py-5 mt-2 focus:outline-none focus-visible:ring-0 ' />
        {errors.zip && <span className='text-red-500'>{errors.zip.message}</span>}
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="phone" className='text-sm'>Phone number *</label>
        <Input id='phone' type='text' {...register('phone')} className='rounded-none py-5 mt-2 focus:outline-none focus-visible:ring-0 ' />
        {errors.phone && <span className='text-red-500'>{errors.phone.message}</span>}
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="email" className='text-sm'>Email address *</label>
        <Input id='email' type='text' {...register('email')} className='rounded-none py-5 mt-2 focus:outline-none focus-visible:ring-0 ' />
        {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
      </div>

      <div className='flex flex-col gap-1'>
        <label htmlFor="notes" className='text-sm'>Order notes (optional)</label>
        <textarea rows={5} id='notes' placeholder='Notes about your order, e.g. special notes for delivery.' {...register('notes')} className='rounded-none p-3 mt-2 text-sm border w-full focus:outline-none focus-visible:ring-0 ' />
        {errors.notes && <span className='text-red-500'>{errors.notes.message}</span>}
      </div>
    </div>
  )
}

export default BillingDetails 