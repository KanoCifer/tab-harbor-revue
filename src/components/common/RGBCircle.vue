<script
  setup
  lang="ts"
>
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  size?: string;
}>(), {
  size: '1rem'
});

const color_circle = computed(() => {
  // 在这里快速调整比率
  const blue = 0.25;
  const red = 0.25;
  const yellow = 0.25;
  const green = 0.25;

  const sum = blue + red + yellow + green;
  const ratio = [blue / sum, red / sum, yellow / sum, green / sum];
  const blue_start = 0;
  const red_start = blue_start + 360 * ratio[0];
  const yellow_start = red_start + 360 * ratio[1];
  const green_start = yellow_start + 360 * ratio[2];

  return `var(--google-c-blue) ${blue_start}deg ${red_start}deg,` +
    `var(--google-c-red) ${red_start}deg ${yellow_start}deg,` +
    `var(--google-c-yellow) ${yellow_start}deg ${green_start}deg,` +
    `var(--google-c-green) ${green_start}deg 360deg`;
});

const auto_style = computed(() => {
  return {
    '--size': props.size,
    '--circle-gradient': color_circle.value
  };
});
</script>

<template>
  <div
    class="rgb-circle"
    :style="auto_style"
  >
    <div class="circle-inner">
      <slot />
    </div>
  </div>
</template>

<style
  scoped
  lang="scss"
>

@property --angle {
  syntax:        "<angle>";
  initial-value: 0deg;
  inherits:      false;
}

.rgb-circle {
  position:      relative;
  display:       inline-block;
  width:         var(--size);
  height:        var(--size);
  margin:        0;
  transition:    transform 0.2s ease-in-out;
  border-radius: 50%;
  background:    var(--theme-c-page-bg);

  /* 确保内容在伪元素之上 */
  .circle-inner {
    position:        relative;
    z-index:         1;
    display:         flex;
    align-items:     center;
    justify-content: center;
    width:           100%;
    height:          100%;
    border-radius:   50%;
    background:      transparent;
  }

  &::after {
    position:      absolute;
    top:           50%;
    left:          50%;
    width:         calc(100% + 15px);
    height:        calc(100% + 15px);
    content:       '';
    animation:     3s spin linear infinite;
    border-radius: 50%;
    background:    conic-gradient(from var(--angle), var(--circle-gradient));
    translate:     -50% -50%;

    /* 核心修改：使用 mask 切掉中心 */
    /* 逻辑：从中心到 (半径-15px) 为透明，剩下的 15px 外圈为黑色（显示） */

    mask:          radial-gradient(farthest-side, transparent calc(100% - 8px), #000 0);
  }

  &:hover {
    transform: scale(1.05);
  }
}

@keyframes spin {
  from {
    --angle: 0deg;
  }

  to {
    --angle: 360deg;
  }
}

</style>