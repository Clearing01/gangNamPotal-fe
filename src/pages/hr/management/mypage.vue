<template>
  <div class="app-pageheader">
    <q-btn
      class="app-btn btn-basic btn-ghost-black btn-only-icon btn-prev"
      flat
      ></q-btn>
    <span class="main-title">{{ sampleData.nameKr }}</span>
    <q-space />
    <div class="button-wrapper">
      <q-btn class="app-btn btn-basic btn-primary" flat @click="employeeUpdate()">수정</q-btn>
    </div>
  </div>
  <div class="employee-info-container">
    <div class="personal-info-container flex no-wrap">
      <!--기본 정보-->
      <div class="detail-info-container detail-basic">
        <div class="app-detail-info-wrapper info-height">
          <div class="detail-info-header">
            <span class="title">기본 정보</span>
          </div>
          <div class="info-content-wrapper">
            <div class="info-profile-wrapper">
              <div class="info-profile-section">
                <template v-if="1!==1">
                  <img :src="sampleData.photoPath" alt="">
                </template>
                <template v-else>
                  <img src="@/assets/images/teemo.png" />
                </template>
              </div>
            </div>
            <div class="info-content-section">
              <div class="row-info">
                <div class="info-title">이름<span class="aster" v-if="1!==1">*</span></div>
                <div class="app-input-wrapper">
                  <q-input class="app-input" outlined v-model="sampleData.nameKr" readonly
				  />
                  <div class="hint-text-wrapper" >
                    <div class="hint-text" >
                      <!-- checkErrorNameKr -->
                    </div>
                    <div class="num-text">
                    </div>
                  </div>
                </div>
              </div>
              <div class="row-info">
                <div class="info-title">영어 이름<span class="aster" v-if="1!==1">*</span></div>
                <div class="app-input-wrapper">
                  <q-input class="app-input" outlined v-model="sampleData.nameEn" readonly
                  />
                  <div class="hint-text-wrapper" >
                    <div class="hint-text" >
                      <!-- checkErrorNameEn -->
                    </div>
                    <div class="num-text">
                    </div>
                  </div>
                </div>
              </div>
              <div class="row-info info-birth">
                <div class="info-title">생년월일<span class="aster" v-if="1!==1">*</span></div>
                <div class="app-input-wrapper">
                  <q-input class="app-input" outlined v-model="sampleData.birth" readonly
                  />
                  <div class="hint-text-wrapper">
                    <div class="hint-text"></div>
                    <div class="num-text"></div>
                  </div>
                </div>
                <q-btn-toggle
					v-model="sampleData.gender"
                    class="app-btn btn-small-toggle-switch"
                    no-caps
                    unelevated
                    :options="[
                    {label: '남', value: 'male'},
                    {label: '여', value: 'female'}
                  ]"
                />
              </div>
              <div class="row-info">
                <div class="info-title">연락처<span class="aster">*</span></div>
                <div class="app-input-wrapper">
                  <q-input class="app-input" outlined v-model="sampleData.phone"
                    mask="###-####-####"
                    />
                  <div class="hint-text-wrapper" >
                    <div class="hint-text">
                      <!-- checkErrorPhone -->
                    </div>
                    <div class="num-text">
                    </div>
                  </div>
                </div>
              </div>
              <div class="row-info address-info">
                <div class="info-title">주소<span class="aster">*</span></div>
                <div class="app-input-wrapper">
                  <q-input class="app-input input-textarea" type="textarea" outlined v-model="sampleData.address" />
                  <div class="hint-text-wrapper" >
                    <div class="hint-text"></div>
                    <div class="num-text"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--입사 정보-->
      <div class="detail-info-container detail-company">
        <div class="app-detail-info-wrapper">
          <div class="detail-info-header">
            <span class="title">입사 정보</span>
          </div>

          <div class="info-content-wrapper">
            <div class="info-content-section">

              <div class="row-info">
                <div class="info-title">상태</div>
			  <template v-for="(stat, index) of selectOption.stat" :key="index">
                <q-radio
                  class="app-btn btn-radio read-only"
                  v-model="sampleSelectData.stat"
				  :label="stat.label"
				  :val="stat.label"
				  disable
                  />
              </template>

  	            </div>

              <div class="row-info info-order">
                <div class="info-title">입사일<span class="aster" v-if="1!==1">*</span></div>
                <div class="app-input-wrapper">
                  <q-input class="app-input" outlined v-model="sampleData.joinDt" readonly
                  />
                  <div class="hint-text-wrapper">
                    <div class="hint-text"></div>
                    <div class="num-text"></div>
                  </div>
                </div>

                
                  <div class="info-title">사번<span class="aster" v-if="1!==1">*</span></div>
                  <div class="app-input-wrapper">
                    <q-input class="app-input" outlined v-model="sampleData.employeeNo" readonly
                      />
                    <div>
                      <div class="hint-text">
                        <!-- checkErrorEmployeeNo -->
                      </div>
                      <div class="num-text">
                      </div>
                    </div>
                  </div>
                
              </div>
            </div>
          </div>
        </div>

        <div class="app-detail-info-wrapper">
          <div class="detail-info-header">
            <span class="title">인사 배치</span>
          </div>
          <div class="info-content-wrapper">
            <div class="info-content-section">
              <div class="row-info">
                <div class="info-title">권한</div>
					<template v-for="(permission, index) of selectOption.permission" :key="index">
					<q-radio
						class="app-btn btn-radio read-only"
						v-model="sampleSelectData.permission"
						:label="permission.label"
						:val="permission.label"
						disable
					/>
					</template>
              	</div>

              <div class="row-info info-arrangement">
                <div class="info-title">소속<span class="aster" v-if="1!==1">*</span></div>
                <div class="app-input-wrapper">
                  <q-select
                    class="app-input input-select"
                    popup-content-class="select-popup"
                    outlined
					v-model="sampleSelectData.affi"
                    :options="selectOption.affi"
					readonly
                    >
                    <!-- <template>
                      <template v-if="selectData.dept.label">
                        {{ selectData.dept.label }}
                      </template>
                      <template v-else-if="isRegister">
                        선택하세요
                      </template>
                      <template v-else>
                      </template>
                    </template> -->
                  </q-select>
                  <div class="hint-text-wrapper">
                    <div class="hint-text"></div>
                  </div>
                </div>

                <div class="info-title">부서<span class="aster" v-if="1!==1">*</span></div>
                <div class="app-input-wrapper">

                  <q-select
                    class="app-input input-select"
                    popup-content-class="select-popup"
                    outlined
					v-model="sampleSelectData.dept"
                    :options="selectOption.affi[0].dept"
					readonly
                    >
                    <!-- <template v-slot:selected>
                      <template v-if="selectData.team.label">
                        {{ selectData.team.label }}
                      </template>
                      <template v-else-if="isRegister">
                        선택하세요
                      </template>
                      <template v-else>
                      </template>
                    </template> -->
                  </q-select>
                  <div class="hint-text-wrapper">
                    <div class="hint-text"></div>
                  </div>
                </div>

                <div class="info-title">직급<span class="aster" v-if="1!==1">*</span></div>
                <div class="app-input-wrapper">
                  <q-select
                    class="app-input input-select"
                    popup-content-class="select-popup"
                    outlined
					v-model="sampleSelectData.rank"
                    :options="selectOption.rank"
					readonly
                    >
                    <!-- <template v-slot:selected>
                      <template v-if="selectData.rank.label">
                        {{ selectData.rank.label }}
                      </template>
                      <template v-else-if="isRegister">
                        선택하세요
                      </template>
                      <template v-else>
                      </template>
                    </template> -->
                  </q-select>
                  <div class="hint-text-wrapper">
                    <div class="hint-text"></div>
                  </div>
                </div>
              </div>
          </div>
          </div>
        </div>
        <div class="app-detail-info-wrapper">
          <div class="detail-info-header">
            <span class="title">계정 정보</span>
          </div>
          <div class="info-content-wrapper">
            <div class="info-content-section">
              <div class="row-info info-email">
                <div class="info-title">이메일<span class="aster" v-if="1!==1">*</span></div>
                <div class="app-input-wrapper">
                  <q-input class="app-input" outlined v-model="sampleData.email" readonly
                    autocomplete="off"
                    />
                  <div class="hint-text-wrapper" >
                    <div class="hint-text">
                      <!-- <template v-if="isCheckDuplicate">
                        이미 사용 중인 이메일입니다
                      </template>
                      <template v-else-if="isCheckDuplicate === false">
                        사용 가능한 이메일입니다
                      </template> -->
                    </div>
                  </div>
                </div>
                <div class="append-address">@twolinecode.com</div>
                <!-- <q-btn class="app-btn btn-basic btn-primary-border btn-duplication-check" flat
                      >중복확인</q-btn> -->
              </div>

              <!-- <template v-if="isRegister && (isModify === false)"> -->
              
                <div class="row-info info-email">
                  <div class="info-title">비밀번호<span class="aster">*</span></div>
                  <div class="app-input-wrapper" style="width: 400px">
                    <q-input class="app-input input-password" outlined
                      autocomplete="new-password"
					  :type="hidePassword ? 'password' : 'text'"
                      placeholder="비밀번호는 6자리 이상 가능합니다"
					  v-model="sampleData.password"
					  maxlength="15"
                      >
                      <template v-slot:append>
                        <q-icon
                            :name="hidePassword ? 'icon-visibility-off' : 'icon-visibility'"
                            class="cursor-pointer"
                            @click="hidePassword = !hidePassword"
                        />
                      </template>
                    </q-input>
                    <div class="hint-text-wrapper" >
                      <div class="hint-text" v-if="1!==1">
                        {{checkErrorPassword}}
                      </div>
                      <div class="num-text">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row-info info-email">
                  <div class="info-title">비밀번호 &nbsp;&nbsp;&nbsp;&nbsp; 확인<span class="aster">*</span></div>
                  <div class="app-input-wrapper" style="width: 400px">
                    <q-input class="app-input input-password"
					  :type="hidePassword2 ? 'password' : 'text'"
                      outlined
                      placeholder="비밀번호를 한번 더 입력해주세요"
					  v-model="sampleData.passwordRepeat"
					  :error="checkErrorPasswordRefeat !== false"
					  maxlength="15"
                      >
                      <template v-slot:append>
                        <q-icon
                            :name="hidePassword2 ? 'icon-visibility-off' : 'icon-visibility'"
                            class="cursor-pointer"
                            @click="hidePassword2 = !hidePassword2"
                        />
                      </template>
                    </q-input>
					<!-- <q-btn class="app-btn btn-basic btn-primary-border btn-duplication-check" flat
                      >중복확인</q-btn> -->
                    <div class="hint-text-wrapper" :class="{'error': checkErrorPasswordRefeat}">
                      <div class="hint-text" v-if="checkErrorPasswordRefeat !== false">
                        {{checkErrorPasswordRefeat}}
                      </div>
                      <div class="num-text">
                      </div>
                    </div>
                  </div>
                </div>
              

            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import router from '@/router'
import { ref, computed } from 'vue';

const employeeData = ref({
  nameKr: '',
  nameEn: '',
  birth: '',
  gender: '',
  phone: '',
  address: '',
  stat: '',
  joinDt: '',
  employeeNo: '',
  permission: {
    permissionId: ''
  },
  dept: {
    deptId: '',
    affi: {
      affiId: ''
    },
  },
  rank: {
    rankId: ''
  },
  email: '',
  password: '',
  passwordRepeat: '',
  photoPath: '',
})

const sampleData = ref({
  nameKr: '박민호',
  nameEn: 'Park minho',
  birth: '1993.11.06',
  gender: 'male',
  phone: '01051882240',
  address: '서울시 서대문구 연희로 41나길 38',
  stat: '재직',
  joinDt: '2022.11.16',
  employeeNo: '153',
  permission: {
    permissionId: '1',
	permissionName: '일반사용자',
  },
  dept: {
    deptId: '1',
	deptName: '개발',
    affi: {
      affiId: '1',
	  affiName: '개발',
    },
  },
  rank: {
    rankId: '3',
	rankName: '선임',
  },
  email: 'minho.park@twolinecode.com',
  password: 'tlc123',
  passwordRepeat: 'tlc123',
  photoPath: '@/assets/images/teemo.png',
})

const selectOption = ref({
  stat: [
	{label: '재직', id: 1},
    {label: '퇴직', id: 2}
  ],
  permission: [
	{label: '일반사용자', id: 1},
    {label: '관리자', id: 2}
  ],
  affi: [
	{label: '개발', id: 1, dept : ['개발','퍼블리셔'] },
    {label: 'QA', id: 2},
	{label: '경영지원', id: 3},
    {label: '디자인', id: 4},
	{label: '마케팅', id: 5}
  ],
  rank: [
	{label: '선임', id: 1},
    {label: '수석', id: 2}
  ],
})

const sampleSelectData = ref({
  stat: '재직',
  permission: '일반사용자',
  dept: '개발',
  affi: '개발',
  rank: '선임',
})

const hidePassword = ref(true);
const hidePassword2 = ref(true);

let passwordRepeat = true;

const employeeUpdate= () => {
	// 사용자정보 업데이트, 세션내의 로그인 정보 삭제 후 로그인 화면으로
	if(passwordRepeat !== true){
		return
	}
	router.push("/login");
}

const checkErrorPasswordRefeat = computed(() => {
  if (sampleData.value?.passwordRepeat?.length > 0) {
    if (sampleData.value.password !== sampleData.value.passwordRepeat) {
		passwordRepeat = false;
      return '비밀번호가 일치하지 않습니다';
    }
  }
  passwordRepeat = true;
  return false;
})

console.log(sampleData.value.passwordRepeat);

</script>

<style scoped lang="scss">
  .employee-info-container{
    min-height: calc(100% - 72px);
    padding: 28px;
    background: $blue-gray-1;
    //border: 1px solid $blue-gray-3;
    //border-radius: 0 0 20px 0;
  }
  .personal-info-container{
    display: flex;
    margin-bottom: 20px;
    .detail-info-container{
      &.detail-basic{
        min-width: 478px;
        width: 42.23%;
        .info-content-wrapper{
          .info-profile-wrapper{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 20px 0 44px;
            .info-profile-section{
              width: 150px;
              height: 150px;
              border-radius: 50%;
              overflow: hidden;
              img{
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            .btn-upload{
              margin-top: 16px;
            }
          }
          .info-content-section{
            .row-info + .row-info{
              margin-top: 8px;
            }
          }
        }
      }
      .info-content-section{
        .row-info{
          display: flex;
          .info-title{
            flex-shrink: 0;
            width: 54px;
            margin-top: 12px;
            font-size: $font-02;
            line-height: $font-06;
            font-weight: 500;
            color: $blue-gray-10;
            .aster{
              display: inline-block;
              margin-left: 2px;
              font-size: $font-02;
              line-height: $font-06;
              font-weight: 500;
              color: #FF6161;
            }
          }
          .info-title + *{
            margin-left: 12px;
          }
          .app-input-wrapper{
            width: 100%;
            .app-input{
              width: 100%;
              margin-top: 0;
            }
            .app-input-picker{
              width: 100%;
              margin-top: 0;
            }
            .input-textarea{
              height: 236px;
            }
          }
          &.info-birth{
            .app-input-wrapper{
              .app-input-picker{
                width: calc(100% - 12px);
              }
            }
          }
        }
      }
      &.detail-company{
        min-width: 654px;
        width: 57.77%;
        margin-left: 20px;
        .app-detail-info-wrapper + .app-detail-info-wrapper{
          margin-top: 20px;
        }
        .app-detail-info-wrapper{
          .info-content-section{
            .row-info + .row-info{
              margin-top: 20px;
            }
            .row-info{
              .info-title{
                width: 40px;
              }
              .btn-radio{
                padding: 10px 0;
              }
              .btn-radio + .btn-radio{
                margin-left: 20px;
              }
              .app-input-wrapper + .info-title{
                margin-left: 20px;
              }
              &.info-order{
                margin-top: 28px;
                > .app-input-wrapper:nth-child(2){
                  min-width: 264px;
                  width: 55.7%;
                  &.one-input{
                    width: calc(55.7% - 72px);
                  }
                }
                > .app-input-wrapper:nth-child(4){
                  min-width: 210px;
                  width: 44.3%;
                }
              }
              &.info-arrangement{
                .info-title{
                  width: 30px;
                }
                margin-top: 28px;
                .app-input-wrapper{
                  min-width: 144px;
                  .hint-text-wrapper{
                    .hint-text{
                      min-width: auto;
                    }
                  }
                }
              }
              &.info-email{
                .info-title{
                  width: 74px;
                }
                .append-address{
                  margin-left: 12px;
                  margin-top: 12px;
                  font-size: $font-04;
                  line-height: $font-08;
                  font-weight: 500;
                  color: $blue-gray-9;
                }
                .btn-duplication-check{
                  flex-shrink: 0;
                  flex-grow: 0;
                  width: auto;
                  margin-left: 39px;
                }
              }
            }
            .info-arrangement + .row-info{
              margin-top: 8px;
            }
            .info-order + .info-order{
              margin-top: 8px;
            }
            .info-email + .info-email{
              margin-top: 8px;
            }
            .info-sign{
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .app-input-wrapper{
                width: 100%;
                .input-file{
                  width: 100%;
                }
              }
              .sign-section{
                width: 120px;
                height: 96px;
                img{
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
              }
            }
          }
        }
      }
    }
  }
</style>