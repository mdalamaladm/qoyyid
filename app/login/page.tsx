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

import { FormValue } from '@/@types/form.d'
import { LoginForm } from '@/@types/auth.d'

export default function LoginPage() {
  const router = useRouter()
  
  const { locale } = useLocale()
  const { snackbar } = useSnackbar()
  const { initForm, formErrorAll } = useForm()
  const { login } = useApi()
  
  const onLogin = async (payload: FormValue) => {
    const { data, err, errParams } = await login(payload as LoginForm)

    if (err) {
      return snackbar.error(locale(err, errParams))
    }
    
    snackbar.info(locale('Welcome, $1!', [`#i-${data?.name}`]))
    
    router.push('/notes')
  }
  
  const goToRegister = () => router.push('/register')
  
  React.useEffect(() => {
    initForm({
      value: {
        username: '',
        password: '',
      },
      rules: {
        username: [],
        password: [],
      }
    })
  }, [])
  
  return (
    <main className="flex flex-col justify-end box-content h-[30rem] pb-20">
      <UForm id="login" onSubmit={onLogin}>
        <div className="flex justify-center py-2">
          <img className="scale-[0.85]" src="/assets/qoyyid.svg" />
        </div>
        <UInputText label={locale('Username')} name="username" block hideMessage />
        <UInputPassword label={locale('Password')} name="password" block hideMessage/>
        
        <UButton type="solid" color="accent" block style="mt-10" submit="login">{locale('Login')}</UButton>
      </UForm>
      <UButton type="link" color="accent" style="mt-2" onClick={goToRegister} >{locale('Register')}</UButton>
    </main>
  )
}
