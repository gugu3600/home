import { inventoryRepository } from '../repositories/inventoryRepository.js'
import { expenseRepository } from '../repositories/expenseRepository.js'
import { itemRepository } from '../repositories/itemRepository.js'

export const inventoryService = {
  getAll(userId) {
    return inventoryRepository.findByUser(userId)
  },

  async adjust(id, delta, userId) {
    const inv = await inventoryRepository.findById(id)
    if (!inv) throw new Error('Inventory not found')

    if (delta > 0) {
      const item = await itemRepository.findById(inv.itemId)
      if (item) {
        await expenseRepository.create({
          title: item.name,
          amount: item.price || 0,
          date: new Date(),
          userId,
          itemId: inv.itemId,
        })
      }
    }

    const newQty = inv.quantity + delta
    if (newQty <= 0) {
      await inventoryRepository.delete(id)
      await maybeUnpurchase(inv.itemId)
      return null
    }

    if (delta >= 0) {
      return inventoryRepository.update(id, { quantity: { increment: delta } })
    }
    return inventoryRepository.update(id, { quantity: { decrement: Math.abs(delta) } })
  },

  async remove(id) {
    const inv = await inventoryRepository.findById(id)
    if (!inv) throw new Error('Inventory not found')
    await inventoryRepository.delete(id)
    await maybeUnpurchase(inv.itemId)
  },
}

async function maybeUnpurchase(itemId) {
  const count = await inventoryRepository.countByItemId(itemId)
  if (count === 0) {
    await itemRepository.update(itemId, { purchased: false })
  }
}
