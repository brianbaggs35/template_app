import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from '@/App.vue'
import HomeView from '@/views/HomeView.vue'

function makeRouter() {
  return createRouter({
    history: createWebHashHistory(),
    routes: [{ path: '/', component: HomeView }],
  })
}

describe('App', () => {
  it('renders without errors', async () => {
    const router = makeRouter()
    await router.push('/')
    await router.isReady()

    const wrapper = mount(App, { global: { plugins: [router] } })
    expect(wrapper.find('#root').exists()).toBe(true)
  })

  it('renders a RouterView', async () => {
    const router = makeRouter()
    await router.push('/')
    await router.isReady()

    const wrapper = mount(App, { global: { plugins: [router] } })
    expect(wrapper.findComponent(HomeView).exists()).toBe(true)
  })
})
