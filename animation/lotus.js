export function animateLotus(lotusModel, time) {
    if (!lotusModel) return;
    // Sen nhấp nhô nhẹ theo sóng nước
    lotusModel.position.y = Math.sin(time * 1.5) * 0.9 ;
}