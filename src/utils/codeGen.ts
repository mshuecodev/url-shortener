import { customAlphabet } from "nanoid"
import { SHORT_CODE_LENGTH } from "../config"

const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
const nanoid = customAlphabet(alphabet, SHORT_CODE_LENGTH)

export function generateCode(): string {
	return nanoid()
}
