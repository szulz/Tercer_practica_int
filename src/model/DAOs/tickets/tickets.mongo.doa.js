const ticketsModel = require("../../schemas/tickets.schema")


class TicketsDao {
    async createTicket(ticket) {
        const createdTicket = await ticketsModel.create(ticket)
        return createdTicket
    }
}

module.exports = TicketsDao