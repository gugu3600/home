import { prisma } from '../../config/prisma.js'

export const statsController = {
  async dashboard(req, res) {
    try {
      const userId = req.user.id
      const now = new Date()
      const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

      const expenses = await prisma.expense.findMany({
        where: { userId, date: { gte: firstOfMonth } },
        include: { item: { include: { category: true } } },
      })

      const inventory = await prisma.inventory.findMany({
        where: { userId },
        include: { item: { include: { category: true } } },
      })

      const categorySpending = {}
      const monthlyExpenses = {}
      let mostExpensive = null

      for (const e of expenses) {
        const cat = e.item?.category?.name || 'Other'
        categorySpending[cat] = (categorySpending[cat] || 0) + e.amount

        const month = new Date(e.date).toLocaleString('default', { month: 'short', year: '2-digit' })
        monthlyExpenses[month] = (monthlyExpenses[month] || 0) + e.amount

        if (!mostExpensive || e.amount > mostExpensive.amount) {
          mostExpensive = { title: e.title, amount: e.amount, item: e.item?.name }
        }
      }

      const categoryCounts = {}
      for (const inv of inventory) {
        const cat = inv.item?.category?.name || 'Other'
        categoryCounts[cat] = (categoryCounts[cat] || 0) + inv.quantity
      }

      res.json({
        categorySpending: Object.entries(categorySpending).map(([name, value]) => ({ name, value })),
        categoryCounts: Object.entries(categoryCounts).map(([name, count]) => ({ name, count })),
        monthlyExpenses: Object.entries(monthlyExpenses).map(([month, total]) => ({ month, total })),
        mostExpensive,
        totalInventory: inventory.reduce((s, i) => s + i.quantity, 0),
        totalItems: inventory.length,
      })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
}
