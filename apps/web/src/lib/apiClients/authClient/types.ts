interface IAPIUser {
	username: string;
}

type TSignUpRequest = IAPIUser;
type TSignUpResponse = IAPIUser;

type TSignInRequest = IAPIUser;
type TSignInResponse = IAPIUser;

type TValidateResponse = IAPIUser;

export type {
	IAPIUser,
	TSignUpRequest,
	TSignUpResponse,
	TSignInRequest,
	TSignInResponse,
	TValidateResponse
};
