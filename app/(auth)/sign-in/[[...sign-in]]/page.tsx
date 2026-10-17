import { SignIn } from '@clerk/nextjs'


function SignInPage() {
  return (
    <div className='flex justify-center py-8'>
      <SignIn />
    </div>
  )
}

export default SignInPage
