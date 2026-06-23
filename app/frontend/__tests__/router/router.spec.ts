import { describe, it, expect } from 'vitest'
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

describe('router', () => {
  it('has a home route at /', async () => {
    const router = createRouter({
      history: createWebHashHistory(),
      routes: [{ path: '/', name: 'home', component: HomeView }],
    })
    await router.push('/')
    expect(router.currentRoute.value.name).toBe('home')
  })

  it('resolves to / after initial navigation', async () => {
    const router = createRouter({
      history: createWebHashHistory(),
      routes: [{ path: '/', name: 'home', component: HomeView }],
    })
    await router.push('/')
    await router.isReady()
    expect(router.currentRoute.value.path).toBe('/')
  })
})
