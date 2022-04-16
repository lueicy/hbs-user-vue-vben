<template>
  <div class="p-4">
    <GrowCard
      :loading="loading"
      class="enter-y"
    />
    <SiteAnalysis
      class="!my-4 enter-y"
      :loading="loading"
    />

    <div class="md:flex enter-y">
      <VisitRadar
        class="w-full md:w-1/3"
        :loading="loading"
      />

      <VisitSource
        class="md:w-1/3 md:!mx-4 md:!my-0 !my-4 w-full"
        :loading="loading"
      />
      <SalesProductPie
        class="w-full md:w-1/3"
        :loading="loading"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, computed, unref, ref } from 'vue';
import GrowCard from './components/GrowCard.vue';
import SiteAnalysis from './components/SiteAnalysis.vue';
import VisitSource from './components/VisitSource.vue';
import VisitRadar from './components/VisitRadar.vue';
import SalesProductPie from './components/SalesProductPie.vue';
import { usePermission } from '/@/hooks/web/usePermission';
import { RoleEnum } from '/@/enums/roleEnum';
import { getROLES } from '/@/utils/auth';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    GrowCard,
    SiteAnalysis,
    VisitRadar,
    VisitSource,
    SalesProductPie,
  },
  setup() {
    // const { currentRoute, replace } = useRouter();
    const { currentRoute } = useRouter();
    const loading = ref(true);
    const { changeRole } = usePermission();
    function getIsSuper() {
      console.log('isSuper---', getROLES());
      console.log('RoleEnum.SUPER ==-123456--', RoleEnum.SUPER);
      console.log('RoleEnum.SUPER == getROLES()---', RoleEnum.SUPER == getROLES());
      if (RoleEnum.SUPER == getROLES()) {
        changeRole(RoleEnum.SUPER);
      } else {
        changeRole(RoleEnum.TEST);
      }
    }
    setTimeout(() => {
      loading.value = false;
    }, 1500);
    const routerParams = computed(() => {
      return unref(currentRoute).params;
    });
    console.log('routerParams---',routerParams)
    onMounted(() => getIsSuper());
    return { loading };
  },
});
</script>
