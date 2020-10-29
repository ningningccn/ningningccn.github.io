<template>
  <div>
    <nav id="sidebarMenu" class="col-md-12 col-lg-12 d-md-block bg-light sidebar collapse">
      <div class="sidebar-sticky pt-3">
        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-1 mb-1 text-muted">
          <span>管理員</span>
          <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <!-- <a class="nav-link" href="#">
              <span data-feather="file-text"></span>
              <i class="fas fa-box-open"></i>
              產品列表
            </a> -->
            <router-link to="/admin/products" class="nav-link" active-class="active" >
              <i class="fas fa-box-open"></i>
              產品列表
            </router-link>
          </li>
        </ul>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/orderlist" active-class="active">
              <i class="fas fa-th-list"></i>
              訂單列表
            </router-link>
          </li>
        </ul>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/discount" active-class="active">
              <i class="fas fa-tag"></i>
              優惠卷
            </router-link>
          </li>
        </ul>

        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>模擬功能</span>
          <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link class="nav-link" to="/customer_order" active-class="active">
              <span data-feather="file-text"></span>
              <i class="fas fa-shopping-cart"></i>
              模擬訂單
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  return: {
    choosepage:false,
  }
}
</script>