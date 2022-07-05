import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { LOCAL_STORAGES, API_SERVICES, ROUTES } from '~/constants'

export const state = () => ({
  isHiddenInput: false,
  objRegister: null,
  baseURL: ''
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  getIsHiddenInput: state => state.isHiddenInput,
  getToken: () => {
    if (process.client) return localStorage.getItem(LOCAL_STORAGES.ACCESS_TOKEN)
  },
  getMemberId: () => {
    if (process.client) return localStorage.getItem(LOCAL_STORAGES.MEMBER_ID)
  },
  getAuthenticated: () => {
    if (process.client) return JSON.parse(localStorage.getItem(LOCAL_STORAGES.AUTHENTICATED) || 'false')
  },
  getProfileRegister: state => state.objRegister,
  getBaseURL: state => state.baseURL
}

export const mutations: MutationTree<RootState> = {
  setToken: (state, token) => localStorage.setItem(LOCAL_STORAGES.ACCESS_TOKEN, token),
  setMemberId: (state, memberId) => localStorage.setItem(LOCAL_STORAGES.MEMBER_ID, memberId),
  setAuthenticated: (state, authenticated) => localStorage.setItem(LOCAL_STORAGES.AUTHENTICATED, authenticated),
  setIsHiddenInput: (state, isHidden ) => state.isHiddenInput = !isHidden,
  setProfileRegister: (state, objRegister) => state.objRegister = objRegister,
  setBaseURL: (state, baseURL) => state.baseURL = baseURL
}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ commit }, $config) {
    await commit('setBaseURL', $config.app.$config.baseURL)
  },
  async login ({ commit }, payload) {
    await this.$axios.$post(this.getters.getBaseURL + API_SERVICES.MEMBER_LOGIN, payload)
      .then(response => {
        const { grant_token, member_id } = response
        commit('setMemberId', member_id)
        commit('setAuthenticated', true)
        return Promise.resolve(grant_token)
      }).then(grant_token => {
        this.$axios.$post(this.getters.getBaseURL + API_SERVICES.GET_TOKEN, {
          grant_token: grant_token
        }).then(response => {
          commit('setToken', response.access_token.value)
          this.$router.push(ROUTES.TOP_PAGE)
        })
      }).catch(e => {
        console.log(e.response)
      })
  },
  async logout () {
    await this.$axios.$post(this.getters.getBaseURL + API_SERVICES.MEMBER_LOGOUT, null, {
      headers: { 'x-rcms-api-access-token': this.getters.getToken }
    }).then(response => {
      console.log(response)
      localStorage.removeItem(LOCAL_STORAGES.ACCESS_TOKEN)
      localStorage.removeItem(LOCAL_STORAGES.MEMBER_ID)
      localStorage.removeItem(LOCAL_STORAGES.AUTHENTICATED)
      this.$router.push(ROUTES.AUTH_LOGIN)
    }).catch(e => {
      console.log(e.response)
    })
  },
  async register ({ commit }, payload) {
    await this.$axios.post(this.getters.getBaseURL + API_SERVICES.MEMBER_REGISTER, payload)
      .then(response => {
        console.log(response)
        this.$router.push(ROUTES.AUTH_REGISTER_THANKS)
      }).catch(e => {
        console.log(e.response)
      })
  },
  async updateMember ({ commit }, payload) {
    await this.$axios.$post(this.getters.getBaseURL + `${API_SERVICES.MEMBER_UPDATE}/${this.getters.getMemberId}`, payload, {
      headers: { 'x-rcms-api-access-token': this.getters.getToken }
    }).then(response => {
      console.log(response)
      commit('setIsHiddenInput', this.getters.getIsHiddenInput)
    }).catch(e => {
      console.log(e.response)
    })
  },
  async deleteMember () {
    await this.$axios.$post(this.getters.getBaseURL + `${API_SERVICES.MEMBER_DELETE}/${this.getters.getMemberId}`, null, {
      headers: { 'x-rcms-api-access-token': this.getters.getToken, 'Content-Type': 'application/json' }
    }).then(response => {
      console.log(response)
      localStorage.removeItem(LOCAL_STORAGES.ACCESS_TOKEN)
      localStorage.removeItem(LOCAL_STORAGES.MEMBER_ID)
      localStorage.removeItem(LOCAL_STORAGES.AUTHENTICATED)
      this.$router.push(ROUTES.AUTH_LOGIN)
    }).catch(e => {
      console.log(e.response)
    })
  }
}
