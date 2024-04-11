import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel'

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
      <GuestLayout>
        <Head title="Forgot Password" />
        <div className={'container mt-5 mb-5'}>
          <div className={"row"}>
            <div className={"col-md-6 offset-md-3 offset-lg-3"}>
              <div className="discount-coupon edu-bg-shade">
                <div className="section-title text-start">
                  <h4 className="title mb--30">Quên mật khẩu</h4>
                </div>


                <div className="mb-4 text-sm text-gray-600">
                  Nếu bạn đã quên mật khẩu, hãy nhập email của bạn để nhận liên kết đặt lại mật khẩu.
                </div>

                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                <form onSubmit={submit}>
                  <TextInput
                    id="email"
                    type="email"
                    name="email"
                    placeholder={"Email của bạn"}
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                  />

                  <InputError message={errors.email} className="mt-2" />

                  <div className="flex items-center justify-end mt-4">
                    <PrimaryButton disabled={processing}>
                      Nhận liên kết đặt lại mật khẩu
                    </PrimaryButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </GuestLayout>
    );
}
