import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  isHiddenInput: false,
  objRegister: null
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  getIsHiddenInput: state => state.isHiddenInput,
  getToken: () => {
    if (process.client) return localStorage.getItem('ACCESS_TOKEN')
  },
  getMemberId: () => {
    if (process.client) return localStorage.getItem('MEMBER_ID')
  },
  getAuthenticated: () => {
    if (process.client) return JSON.parse(localStorage.getItem('AUTHENTICATED') || 'false')
  },
  getProfileRegister: state => state.objRegister
}

export const mutations: MutationTree<RootState> = {
  setToken: (state, token) => localStorage.setItem('ACCESS_TOKEN', token),
  setMemberId: (state, memberId) => localStorage.setItem('MEMBER_ID', memberId),
  setAuthenticated: (state, authenticated) => localStorage.setItem('AUTHENTICATED', authenticated),
  setIsHiddenInput: (state, isHidden ) => state.isHiddenInput = !isHidden,
  setProfileRegister: (state, objRegister) => state.objRegister = objRegister
}

export const actions: ActionTree<RootState, RootState> = {
  async login ({ commit }, payload) {
    await this.$axios.$post(process.env.BASE_URL + '/rcms-api/10/login', payload)
      .then(response => {
        const { grant_token, member_id } = response
        commit('setMemberId', member_id)
        commit('setAuthenticated', true)
        return Promise.resolve(grant_token)
      }).then(grant_token => {
        this.$axios.$post(process.env.BASE_URL + '/rcms-api/10/token', {
          grant_token: grant_token
        }).then(response => {
          commit('setToken', response.access_token.value)
          this.$router.push('/')
        })
      }).catch(e => {
        console.log(e.response)
      })
  },
  async logout () {
    await this.$axios.$post(process.env.BASE_URL + '/rcms-api/10/logout', null, {
      headers: { 'x-rcms-api-access-token': this.getters.getToken }
    }).then(response => {
      console.log(response)
      localStorage.removeItem('ACCESS_TOKEN')
      localStorage.removeItem('MEMBER_ID')
      localStorage.removeItem('AUTHENTICATED')
      this.$router.push('/auth/login')
    }).catch(e => {
      console.log(e.response)
    })
  },
  async register ({ commit }, payload) {
    await this.$axios.post(process.env.BASE_URL + '/rcms-api/7/member/register', payload)
      .then(response => {
        console.log(response)
        this.$router.push('/auth/register_thanks')
      }).catch(e => {
        console.log(e.response)
      })
  },
  async updateMember ({ commit }, payload) {
    await this.$axios.$post(process.env.BASE_URL + `/rcms-api/10/member/update/${this.getters.getMemberId}`, payload, {
      headers: { 'x-rcms-api-access-token': this.getters.getToken }
    }).then(response => {
      console.log(response)
      commit('setIsHiddenInput', this.getters.getIsHiddenInput)
    }).catch(e => {
      console.log(e.response)
    })
  },
  async deleteMember () {
    await this.$axios.$post(process.env.BASE_URL + `/rcms-api/10/member/delete/${this.getters.getMemberId}`, null, {
      headers: { 'x-rcms-api-access-token': this.getters.getToken, 'Content-Type': 'application/json' }
    }).then(response => {
      console.log(response)
      localStorage.removeItem('ACCESS_TOKEN')
      localStorage.removeItem('MEMBER_ID')
      localStorage.removeItem('AUTHENTICATED')
      this.$router.push('/auth/login')
    }).catch(e => {
      console.log(e.response)
    })
  }
}
