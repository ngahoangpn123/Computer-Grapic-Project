// Xích đu: Dây gắn với khung cố định, ghế đung đưa quanh điểm cố định
// Chỉ rotation Z (quay quanh trục dọc) để ghế đung đưa, không di chuyển position

export function animateSwing(swingGroup, time) {
    if (!swingGroup) return;
    
    // Lấy các thành phần từ userData (Cập nhật để lấy Pivot)
    const swingBody = swingGroup.userData?.swingBody;
    // const swingsheet1 = swingGroup.userData?.swingsheet1; // Không dùng directly
    // const swingsheet2 = swingGroup.userData?.swingsheet2; // Không dùng directly
    const pivot1 = swingGroup.userData?.pivot1; // Lấy Pivot
    const pivot2 = swingGroup.userData?.pivot2; // Lấy Pivot
    
    // Khung xích đu (Swingbody) giữ cố định tuyệt đối
    if (swingBody) {
        swingBody.rotation.set(0, 0, 0);
        swingBody.position.set(0, 0, 0);
    }
    
    // Góc đung đưa tối đa: 30 độ = ~0.524 radian
    const maxSwingAngle = Math.PI / 6; // 30 độ
    const swingAngle = Math.sin(time * 1.5) * maxSwingAngle;
    
    // --- BẮT ĐẦU SỬA ĐỔI ---

    // ===== GHẾ 1 (thông qua Pivot1) =====
    if (pivot1) {
        // CHỈ rotation Z của PIVOT thay đổi để tạo hiệu ứng đung đưa thực tế quanh điểm treo.
        // Khi pivot xoay quanh tâm của nó, ghế (là con) sẽ đung đưa theo cung tròn.
        // Dây xích luôn nối với pivot tại điểm treo.
        
        pivot1.rotation.set(0, 0, 0); // Reset rotation khác
        pivot1.rotation.order = 'XYZ';
        pivot1.rotation.z = swingAngle; // Xoay pivot quanh điểm treo
    }
    
    // ===== GHẾ 2 (thông qua Pivot2) =====
    if (pivot2) {
        pivot2.rotation.set(0, 0, 0);
        pivot2.rotation.order = 'XYZ';
        pivot2.rotation.z = -swingAngle * 0.85; // Xoay pivot ngược lại
    }
}