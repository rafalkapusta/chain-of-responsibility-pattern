export class FakeResponse {
    data: [string] | null
    errors: [string] | []

    constructor(
        obj:
            | { data: [string]; errors: [] }
            | { data: [string]; errors: [string] }
            | { data: null; errors: [] }
            | { data: null; errors: [string] | [] }
    ) {
        this.data = obj.data
        this.errors = obj.errors
    }

    get response() {
        return this
    }
}

abstract class Message {
    setNextHandler(obj: Message) {}

    handleResponse(res: FakeResponse) {
        console.log("sorry can't handle message")
    }
}

export class Success extends Message {
    private nextMessage?: Message
    constructor() {
        super()
        this.nextMessage = undefined
    }
    setNextHandler(obj: Message) {
        this.nextMessage = obj
    }

    handleResponse(res: FakeResponse) {
        const { data, errors } = res.response
        if (data && data.length && !errors.length) {
            console.log('Success')
        } else {
            this.nextMessage.handleResponse(res)
        }
    }
}

export class Warning extends Message {
    private nextMessage?: Message
    constructor() {
        super()
        this.nextMessage = undefined
    }
    setNextHandler(obj: Message) {
        this.nextMessage = obj
    }

    handleResponse(res: FakeResponse) {
        const { data, errors } = res.response
        if (!data && !errors.length) {
            console.log('Warning')
        } else {
            this.nextMessage.handleResponse(res)
        }
    }
}

export class Error extends Message {
    private nextMessage?: Message
    constructor() {
        super()
        this.nextMessage = undefined
    }
    setNextHandler(obj: Message) {
        this.nextMessage = obj
    }

    handleResponse(res: FakeResponse) {
        const { data, errors } = res.response
        if (data && data.length && errors.length) {
            console.log('Error')
        } else {
            this.nextMessage.handleResponse(res)
        }
    }
}

export class CriticalError extends Message {
    private nextMessage?: Message
    constructor() {
        super()
        this.nextMessage = undefined
    }
    setNextHandler(obj: Message) {
        this.nextMessage = obj
    }

    handleResponse(res: FakeResponse) {
        const { data, errors } = res.response
        if (!data && errors.length) {
            console.log('Critical Error')
        } else {
            this.nextMessage.handleResponse(res)
        }
    }
}
