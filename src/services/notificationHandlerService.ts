const notificationHandlerService = async(): Promise<{status: number, message: string}> => {
    return { status: 200, message: 'response' }
}

export default notificationHandlerService;