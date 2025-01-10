// @ts-nocheck
/**
 * 计算偏移
 * @param {number} containerWidth 容器宽度
 * @param {number} targetLeft 当前元素left值
 * @param {number} targetWidth 当前元素宽度
 * @param {number} offset 上一次 scroll-view left值
 * @return 
 */
export function calcScrollOffset(containerWidth : number, targetLeft : number, targetWidth : number, offset : number) : number {
	return offset + targetLeft - (1 / 2) * containerWidth + targetWidth / 2;
}

/**
 * 根据提供的移动距离和基数进行缓动处理。
 * 如果移动距离的绝对值超过最大阈值，则应用缓动效果。
 *
 * @param {number} moveX - 水平移动的距离。
 * @param {number} base - 应用于缓动效果的基数。
 * @returns {number} 缓动处理后的移动距离。
 */
export function ease(moveX : number, base : number) : number{
	const absDistance = Math.abs(moveX);
	const max = 50
	if (absDistance > max) {
		return (max + (absDistance - max) * 0.2) * base;
	}
	return moveX;
};