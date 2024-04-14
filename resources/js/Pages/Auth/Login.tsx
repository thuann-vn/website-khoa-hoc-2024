import React, { FormEventHandler, useEffect } from 'react'
import Checkbox from '@/Components/Checkbox'
import GuestLayout from '@/Layouts/GuestLayout'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import { PageProps } from '@/types'

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
  const {site_settings} = usePage<PageProps>().props
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  })

  useEffect(() => {
    return () => {
      reset('password')
    }
  }, [])

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('login'))
  }

  return (
    <GuestLayout>
      <Head title="Log in" />

      <div className={'container mt-5 mb-5'}>
          <div className={"row"}>
            <div className={"col-md-6 offset-md-3 offset-lg-3"}>
              <div className="discount-coupon edu-bg-shade">
                <div className="section-title text-start text-center">
                  <h4 className="title mb-4">Đăng nhập</h4>

                  <p className={'mb--30 text-danger text-center'}>
                    Vui lòng mua <Link className={'text-primary bold'} href={route('courses')}>khoá học</Link> để được cấp tài
                    khoản hoặc liên hệ tư vấn: {' '} <br/>
                    <div className={"mt-4"}>
                      <a href={site_settings.messenger} target={'_blank'}>
                        <img src={'/images/fb.png'} width={36} height={36} />
                      </a>
                      {' '}
                      <a href={site_settings.zalo} target={'_blank'} className={'ms-3 inline-block'}>
                        <img src={'/images/zalo.png'} width={36} height={36} />
                      </a>
                    </div>
                  </p>
                </div>

                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                <form onSubmit={submit}>
                  <div className="rbt-form-group">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                      id="email"
                      type="email"
                      name="email"
                      value={data.email}
                      className="mt-1 block w-full"
                      autoComplete="username"
                      isFocused={true}
                      onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                  </div>

                  <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                      id="password"
                      type="password"
                      name="password"
                      value={data.password}
                      className="mt-1 block w-full"
                      autoComplete="current-password"
                      onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                  </div>

                  <div className="d-flex align-items-center justify-end mt-4">
                    {canResetPassword && (
                      <Link
                        href={route('password.request')}
                        className="flex-grow-1 text-nowrap me-5 w-50"
                      >
                        Quên mật khẩu?
                      </Link>
                    )}

                    <PrimaryButton disabled={processing}>
                      Đăng nhập
                    </PrimaryButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
      </div>
    </GuestLayout>
  )
}
