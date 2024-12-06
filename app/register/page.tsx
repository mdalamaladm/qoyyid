'use client'

import React from 'react'

import { useRouter } from 'next/navigation'
import { useLocale } from '@/contexts/LocaleProvider'
import { useSnackbar } from '@/contexts/SnackbarProvider'
import { useForm } from '@/contexts/FormProvider'
import { useApi } from '@/contexts/ApiProvider'

import UForm from '@/components/UForm'
import UInputText from '@/components/UInputText'
import UInputPassword from '@/components/UInputPassword'
import UButton from '@/components/UButton'

import objToClassName from '@/utils/objToClassName'

import { FormValue } from '@/@types/form.d'
import { RegisterForm } from '@/@types/auth.d'

export default function RegisterPage() {
  const router = useRouter()
  
  const { locale } = useLocale()
  const { snackbar } = useSnackbar()
  const { initForm, formErrorAll } = useForm()
  const { register } = useApi()
  
  const onRegister = async (payload: FormValue) => {
    const { err, errParams } = await register(payload as RegisterForm)
    
    if (err) {
      return snackbar.error(locale(err, errParams))
    }
    
    snackbar.success(locale('Registration is completed'))
    
    router.push('/login')
  }
  
  React.useEffect(() => {
    initForm({
      value: {
        name: '',
        username: '',
        password: '',
        confirmPassword: '',
      },
      rules: {
        name: [(v: any) => !!v || locale('$1 is required', ['Name'])],
        username: [(v: any) => !!v || locale('$1 is required', ['Username'])],
        password: [(v: any) => !!v || locale('$1 is required', ['New Password'])],
        confirmPassword: [(v: any, form: FormValue) => v === (form as RegisterForm).password || locale('$1 and $2 is not same', ['Confirm New Password', 'New Password'])]
      }
    })
  }, [])
  
  return (
    <main className="flex flex-col justify-end box-content h-[30rem] pb-20">
      <UForm id="register" onSubmit={onRegister}>
        <UInputText label={locale('Name')} name="name" />
        <UInputText label={locale('Username')} name="username" />
        <UInputPassword label={locale('New Password')} name="password" />
        <UInputPassword label={locale('Confirm New Password')} name="confirmPassword" />
        
        <UButton type="solid" color="accent" block disabled={formErrorAll} style="mt-10" submit="register">{locale('Register')}</UButton>
      </UForm>
      <UButton type="link" color="accent" style="mt-2" onClick={() => router.push('/login')} >{locale('Back')}</UButton>
    </main>
  )
}
