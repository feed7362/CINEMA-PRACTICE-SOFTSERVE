import React from 'react';
import SignUpForm from '@/components/auth/SignUpForm';
import { useSignUp } from '@/hooks/useSignUp';

const SignUp: React.FC = () => {
	const { 
		loading, 
		error, 
		handleRegister, 
		handleGoogleSuccess, 
		handleGoogleError,
		captchaContainerId,
	} = useSignUp();

	return (
		<div className="text-white p-4 h-screen flex items-center justify-center overflow-y-auto no-scrollbar">
			<SignUpForm 
				onSubmit={handleRegister}
				onGoogleSuccess={handleGoogleSuccess}
				onGoogleError={handleGoogleError}
				loading={loading}
				error={error}
				captchaContainerId={captchaContainerId}
			/>
		</div>
	);
};

export default SignUp;