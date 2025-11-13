import { Redirect } from 'expo-router'

export default function Index() {
	return <Redirect href="/onboarding/step-01" />
	// return <Redirect href="/auth/login" />
	// return <Redirect href="/form" />
	// return <Redirect href="/home" />
}
