import React, { useEffect } from 'react';
import { useAuthService } from '../../../contexts/UserContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function EmailValidate() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const auth = useAuthService();

	useEffect(() => {
		const emailConfirmToken = searchParams.get('emailToken');
		const token = auth.getToken();
		if (emailConfirmToken) {
			const validateEmail = async () => {
				try {
					await toast.promise(
						auth.validateEmail({
							emailConfirmToken: emailConfirmToken,
						}),
						{
							loading: 'Validando...',
							success: 'Email validado!',
							error: 'El email no pudo ser validado',
						}
					);
				} catch (error) {
				} finally {
					navigate('/account/profile');
				}
			};
			validateEmail();
		}
	}, []);

	return <></>;
}

export { EmailValidate };
