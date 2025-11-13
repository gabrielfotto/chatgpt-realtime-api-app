export interface Step {
	id: number
	question: string
	options: {
		id: string
		label: string
	}[]
}
