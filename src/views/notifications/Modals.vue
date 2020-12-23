<template>
  <div class="wrapper">
    <div>
      <CRow>
        <CCol col="12">
          <CCard>
            <CCardHeader>
              <CIcon name="cil-justify-center"/> Bootstrap Modals
              <div class="card-header-actions">
                <a 
                  href="https://coreui.io/vue/docs/components/modal" 
                  class="card-header-action" 
                  rel="noreferrer noopener" 
                  target="_blank"
                >
                  <small class="text-muted">docs</small>
                </a>
              </div>
            </CCardHeader>
            <CCardBody>
              <CButton color="primary" @click="primaryModal = true" class="mr-1">
                Launch primary modal
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
    <!-- Modal Component -->
    <CModal
      title="Modal title"
      :show.sync="primaryModal"
      color="primary"
    >
      <CCard>
          <CCardHeader>
            <strong>Basic Form</strong> Elements
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CInput
                description="Let us know your full name."
                label="Enter your name"
                horizontal
                autocomplete="name"
              />
              <CInput
                label="Static"
                value="Username"
                horizontal
                plaintext
              />
              <CInput
                label="Text input"
                description="This is a help text"
                placeholder="Text"
                horizontal
              />
              <CInput
                label="Date"
                type="date"
                horizontal
              />
              <CInput
                label="Email input"
                description="Please enter your email"
                placeholder="Enter your email"
                type="email"
                horizontal
                autocomplete="email"
              />
              <CInput
                label="Password Input"
                description="Please enter a complex password"
                placeholder="Enter your password"
                type="password"
                horizontal
                autocomplete="current-password"
              />
              <CInput
                label="Disabled Input"
                placeholder="Disabled"
                horizontal
                disabled
              />
              <CTextarea
                label="Textarea"
                placeholder="Content..."
                horizontal
                rows="9"
              />
            </CForm>
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" size="sm" color="primary"><CIcon name="cil-check-circle"/> Submit</CButton>
            <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban"/> Reset</CButton>
          </CCardFooter>
        </CCard>
    </CModal>
  </div>
</template>

<script>
export default {
  name: 'Modals',
  data () {
    return {
      myModal: false,
      largeModal: false,
      smallModal: false,
      primaryModal: false,
      successModal: false,
      warningModal: false,
      dangerModal: false,
      infoModal: false,
      darkModal: false
    }
  }
}
</script>
