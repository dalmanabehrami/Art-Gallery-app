export const PATH_PUBLIC = {
  register: "/register",
  login: "/",
  unauthorized: "/unauthorized",
  notFound: "/404",
};

export const PATH_DASHBOARD = {
  dashboard: "/dashboard",
  usersManagement: "/dashboard/users-management",
  updateRole: "/dashboard/update-role/:userName",
  systemLogs: "/dashboard/system-logs",
  myLogs: "/dashboard/my-logs",
  admin: "/dashboard/admin",
  user: "/dashboard/user",
  
  // Art Related Routes
  artworkList: "/dashboard/artwork-list", // Shfaq listën e veprave të artit
  addArtwork: "/dashboard/add-artwork", // Shto vepra arti të reja
  editArtwork: "/dashboard/edit-artwork/:id", // Modifiko veprat ekzistuese
  
  // Art Category Related Routes
  artCategoryPage: "/dashboard/artcategoryPage",
  addArtCategory: "/dashboard/add-artcategory",
  editArtCategory: "/dashboard/edit-artcategory/:id",

  // Other existing routes...
};


  