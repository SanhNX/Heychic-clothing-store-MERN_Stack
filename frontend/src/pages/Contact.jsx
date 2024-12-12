import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      
      <div className='text-center text-2xl pt-10 border-t'>
          <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Address</p>
          <p className=' text-gray-500'>54/709 Tô Ngọc Vân <br /> Thủ Đức, Hồ Chí Minh</p>
          <p className=' text-gray-500'>Tel: (+84) 938086255 <br /> Email: sanh23021987@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>HUTECH - Ngôn ngữ phát triển ứng dụng mới (ECAP126) @ NHÓM 2</p>
          <p className=' text-gray-500'>Nguyễn Xuân Sanh - 2210060076 - sanh23021987@gmail.com</p>
          <p className=' text-gray-500'>Dương Ngô Minh Tân - 2210060085 - duongtanvt@gmail.com</p>
          <p className=' text-gray-500'>Nguyễn Ngọc Tú - 2210060034 - ntu161296@gmail.com</p>
          <p className=' text-gray-500'>Nguyễn Thành Tài - 2210060084 - nguyenthanhtai12@gmail.com</p>
        </div>
      </div>
    </div>
  )
}

export default Contact
