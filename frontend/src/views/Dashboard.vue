<script setup>
import { onMounted, ref } from 'vue'
import { incomeService } from '../services/incomeService.js'
import { expenseService } from '../services/expenseService.js'
import { statsService } from '../services/statsService.js'
import { Doughnut, Bar } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

const totalIncome = ref(0)
const totalExpense = ref(0)
const balance = ref(0)
const recentIncomes = ref([])
const recentExpenses = ref([])
const stats = ref(null)
const doughnutData = ref(null)
const doughnutOptions = ref({ responsive: true, plugins: { legend: { position: 'bottom', labels: { color: '#9ca3af' } } } })
const barData = ref(null)
const barOptions = ref({ responsive: true, plugins: { legend: { display: false }, title: { display: true, text: 'Monthly Expenses', color: '#9ca3af' } }, scales: { x: { ticks: { color: '#9ca3af' } }, y: { ticks: { color: '#9ca3af' } } } })

onMounted(async () => {
  try {
    const incomes = await incomeService.getAll()
    totalIncome.value = incomes.reduce((s, i) => s + i.amount, 0)
    recentIncomes.value = incomes.slice(0, 5)
  } catch {} 

  try {
    const expenses = await expenseService.getAll()
    totalExpense.value = expenses.reduce((s, e) => s + e.amount, 0)
    recentExpenses.value = expenses.slice(0, 5)
  } catch {}

  balance.value = totalIncome.value - totalExpense.value

  try {
    const s = await statsService.dashboard()
    stats.value = s

    if (s.categoryCounts?.length) {
      doughnutData.value = {
        labels: s.categoryCounts.map(c => c.name),
        datasets: [{ data: s.categoryCounts.map(c => c.count), backgroundColor: ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'], borderWidth: 0 }],
      }
    }
    if (s.monthlyExpenses?.length) {
      barData.value = {
        labels: s.monthlyExpenses.map(m => m.month),
        datasets: [{ data: s.monthlyExpenses.map(m => m.total), backgroundColor: '#6366f1', borderRadius: 6 }],
      }
    }
  } catch {}
})
</script>

<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <p class="text-sm text-gray-500 dark:text-gray-400">Total Income</p>
        <p class="text-2xl font-bold text-green-600 dark:text-green-400">${{ totalIncome.toFixed(2) }}</p>
      </div>
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <p class="text-sm text-gray-500 dark:text-gray-400">Total Expense</p>
        <p class="text-2xl font-bold text-red-600 dark:text-red-400">${{ totalExpense.toFixed(2) }}</p>
      </div>
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <p class="text-sm text-gray-500 dark:text-gray-400">Balance</p>
        <p class="text-2xl font-bold" :class="balance >= 0 ? 'text-indigo-600 dark:text-indigo-400' : 'text-red-600 dark:text-red-400'">${{ balance.toFixed(2) }}</p>
      </div>
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <p class="text-sm text-gray-500 dark:text-gray-400">Most Expensive</p>
        <p v-if="stats?.mostExpensive" class="text-2xl font-bold text-orange-600 dark:text-orange-400">${{ stats.mostExpensive.amount.toFixed(2) }}</p>
        <p v-if="stats?.mostExpensive" class="text-xs text-gray-400 dark:text-gray-500 truncate">{{ stats.mostExpensive.item || stats.mostExpensive.title }}</p>
        <p v-else class="text-sm text-gray-400 dark:text-gray-500">N/A</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 class="font-semibold text-gray-900 dark:text-white mb-3">Inventory by Category</h2>
        <div v-if="doughnutData" class="max-h-64 flex justify-center">
          <Doughnut :data="doughnutData" :options="doughnutOptions" />
        </div>
        <div v-else class="text-sm text-gray-400 dark:text-gray-500 text-center py-6">No inventory data yet</div>
      </div>
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 class="font-semibold text-gray-900 dark:text-white mb-3">Monthly Expenses</h2>
        <div v-if="barData" class="max-h-64">
          <Bar :data="barData" :options="barOptions" />
        </div>
        <div v-else class="text-sm text-gray-400 dark:text-gray-500 text-center py-6">No expense data yet</div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 class="font-semibold text-gray-900 dark:text-white mb-3">Recent Incomes</h2>
        <div v-if="recentIncomes.length === 0" class="text-sm text-gray-400 dark:text-gray-500">No incomes yet</div>
        <div v-for="inc in recentIncomes" :key="inc.id" class="flex justify-between py-1 border-b dark:border-gray-700 last:border-0 text-sm">
          <span class="text-gray-700 dark:text-gray-300">{{ inc.title }}</span>
          <span class="text-green-600 dark:text-green-400 font-medium">+${{ inc.amount.toFixed(2) }}</span>
        </div>
      </div>
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 class="font-semibold text-gray-900 dark:text-white mb-3">Recent Expenses</h2>
        <div v-if="recentExpenses.length === 0" class="text-sm text-gray-400 dark:text-gray-500">No expenses yet</div>
        <div v-for="exp in recentExpenses" :key="exp.id" class="flex justify-between py-1 border-b dark:border-gray-700 last:border-0 text-sm">
          <span class="text-gray-700 dark:text-gray-300">{{ exp.title }}</span>
          <span class="text-red-600 dark:text-red-400 font-medium">-${{ exp.amount.toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
