import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

function makeRouter() {
  return createRouter({
    history: createWebHashHistory(),
    routes: [{ path: '/', component: HomeView }],
  })
}

describe('HomeView', () => {
  it('renders the app title', async () => {
    const router = makeRouter()
    const wrapper = mount(HomeView, { global: { plugins: [router] } })

    expect(wrapper.find('h1').text()).toBe('Template App')
  })

  it('renders the version line with Rails and Vue versions', () => {
    const wrapper = mount(HomeView)
    const p = wrapper.find('p').text()

    expect(p).toContain('8.1.3')
    expect(p).toContain('TypeScript')
  })

  it('displays a Vue version string', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.find('p').text()).toMatch(/Vue \d+\.\d+\.\d+/)
  })
})
