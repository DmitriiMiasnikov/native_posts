import { DB } from './db'

export async function bootstrap() {
    try {
        await DB.init()
        console.log('db started..')
    } catch (e) {
        console.log('err', e)
    }

}