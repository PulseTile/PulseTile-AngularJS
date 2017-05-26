/*
 ~  Copyright 2016 Ripple Foundation C.I.C. Ltd
 ~  
 ~  Licensed under the Apache License, Version 2.0 (the "License");
 ~  you may not use this file except in compliance with the License.
 ~  You may obtain a copy of the License at
 ~  
 ~    http://www.apache.org/licenses/LICENSE-2.0

 ~  Unless required by applicable law or agreed to in writing, software
 ~  distributed under the License is distributed on an "AS IS" BASIS,
 ~  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~  See the License for the specific language governing permissions and
 ~  limitations under the License.
 */
let templateDrawingsDetail= require('./drawings-detail.html');

class DrawingsDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, drawingsActions, usSpinnerService, serviceRequests, $timeout, $window) {

    $scope.isEdit = false;
    $scope.isEditDetail = false;

    /* istanbul ignore next */
    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }

      // if (data.drawings.dataGet) {
        // this.drawing = data.drawings.dataGet;
        this.drawing = {
          sourceId: 1,
          name: 'Cardiac Catherization',
          date: new Date(),
          author: 'Dr Jhon Smith',
          source: 'Marand',
          image64: 'data:image/png;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABLAAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFM0ZDMTNCOTQxM0QxMUU3ODQzNjlCQ0JDQzc5RTc5OCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFM0ZDMTNCQTQxM0QxMUU3ODQzNjlCQ0JDQzc5RTc5OCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkUzRkMxM0I3NDEzRDExRTc4NDM2OUJDQkNDNzlFNzk4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkUzRkMxM0I4NDEzRDExRTc4NDM2OUJDQkNDNzlFNzk4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAwICAgICAwICAwUDAwMFBQQDAwQFBgUFBQUFBggGBwcHBwYICAkKCgoJCAwMDAwMDA4ODg4OEBAQEBAQEBAQEAEDBAQGBgYMCAgMEg4MDhIUEBAQEBQREBAQEBARERAQEBAQEBEQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQ/8AAEQgAoQCgAwERAAIRAQMRAf/EAL0AAAICAgMBAAAAAAAAAAAAAAQFAwYCCQEHCAABAAICAwEBAAAAAAAAAAAAAAIDAAEEBQcGCBAAAgEDAwEEBgcFBAUNAQAAAQIDABEEIRIFMUFRYQZxgZEiMhOhwUIjFAcIsdFSMxXwJDQJ4WJywhbxkqKy0mODk1SUtFVlOBEAAgECBAMEBggEBQUBAAAAAAECEQMhMRIEQVFxYYEiBfCRoTJCE7HB0WJyojMUUoKSI7LCUzQV4fFjg9MG/9oADAMBAAIRAxEAPwDtKI3HrrmUcjr7M2tfUgWFzc2sLE/VVvmQA4vzFwPKzvicXyOPlzgE/IhmSSQgWudqknTtvSoXoN0TxNhufLN3YWq5blFc2nQaq4IDDp39n01kp1NU6c6mTPtPae4DqbC+g69NaJtJFcQfJ5bjcEsMzKihKxyTkO6g/KiIDuBf4RuGvjVOSTp2VMqztbt1+CLfiUe91p9DI+UzsTj8Z8zNnjgx4/jmlkVEGu0e8xA1JqrklFVYG2tXL0lGEW5Pgk28m+FeQpxef4TlJTj8ZyOPlyhd5jhnjkYLe17IxpMbsJ5NMz73l+5sx1XLcor70ZR+lIkyCVUnr3AdSe7WmPKprU036YdRfKdCet+h6A9R1Nu0VVRupL09PaLJrfM2MbNqCp6ixsbjqKqqqHR0qCzaLrpa1+21zbso8ilj6ewCLLa9+7QEE669BVpkiqg0o6+q+t/GjTAbFmYhNz4VZKCXLG0a1AJIR5bWBU05ZC2j27/lvEf8FeciOzlYr/8Atlr0nlfuPr9h4nzz9WPT62ewlNxcVujzZzUIa/YnW2tcuR2BoE8wSYS8HyH9QleLE/DynJeM+8sewhmA16CpJ4GXsnP9xDQk51WlPJyrgn6uLwKhx4ficny5i5ZweYwbiDg87FVo8mP+7uN7R3dGjKaNYjqDa4rXeJNJ0fb3Hs9xGO4juHbU7Us7sZUlBrWsIzwcZVxj4eFK0eAfFt5mz5/LSZHmHLLeYsXIyM4xpApT5McciCE/LO1vfszXO6qg7j0+J4ozNz+0trcuNiH9mUYxXio6tp6/FjlVciEeY+X5HgeJxpuTyvxjRZ8uScNsXGeVMTJ+SjvPklVAAHRQS2tE70nFLGuPLhgM/wCOsW9xdlGEVCsEtfzJKs4ptaY1eTwrRIiHL8jznlVOW5Q/MyJOD5oSPpr8vJhjBJGhJC69l6S7muNfuS+oyP2tva7127SpFX7GHKsJumOPHuLV+ae4+SM3bb3nxQm8kD/ExgX1PrrY7lS+X4ew8n/+YaXmUE6tLVl+GXcDZcvmXi/LvN5/KPhRyw4ksmNLgxutisTsS3zWYHstpSrmuFtvCtMCoR2V7eWIQU9LmtWtxy1LBaVFrPmVzzBk8hhLi8a3L5mRkSQTZs/ymxcdre4BaWQKioGvZQGY3PhS7s5QSjVt58DebG1bvSu3FahGKkoKvzJKtXXwxq5SpTF0SwAOO5vleeg4jE5DkJeP/E4+XI2bBsVppYJxGFuVIuEFyB/ppVq/KSjjz9hkb7YWNnO/ctW1LRKGmMtTUVKFcceboq5Y54AGTkSjkMnkYeX/ABMsfEzfKyVREWQo0kXuqQdLre4J1v6KGc5KTadfD9o+3ZhKxbtOxoUtwqx8XhUlbfifR0yWVO1k5/mLImy548HLDpHxc2UNuxgsoYFSTa9wD0pl2/JVS/hbNRtvKIaYSuQz3EYY6l4KOqz7a1F3Iy8viS4nHRZUuR+IjbIaYyxQMzGx2q5Q2AuTa19au7O7FqKefpy+ozdlZ2lyN2/K2o6JKKjplNRWOMkpxeNUs6VWVcU14XJycvjI5sp1lkLODIjBgwVyoN1sDoLaVn7WUpQrJ1PI+cbe1Z3TjaTjGi8Mk01WKqqNt+tt9rzPspSQazUaYQ8hcCiQEiu5h+I91NFSPbP+WzLfyt55h/g5HFb/AJ+Of+zXo/K34H1+w8T55+pHoey16VuzzRlUIa9Im7q5dSh2NqpOWNrddCLHUG4tb0HtogMU6p+npx4C/j/Lnl7jMpszjeMxsWcgoJooUVgp0IBABFx17PClxsxTqkjPv7/c3rfy53JuPJzlmsq45J8qB0XGcZD+G+RixR/g1MeJtjQfJQgAhLDS4UXp6ilTsES3N6WrVJvU6yxzeeOdaVdKkE/l3gMmCLGyONxpYoS7QxPAjJG0h3MVBGlybm3Wg+VBpVWQ6PmG6i3KNyUW6Vak6umVXXGnQIj4LhDE0AwIPlMksRQQoB8udg8i6Do5FyKNRihUt5uHLVrbdU61ecfdl1SqsMDLksTGyoWx8qJJomIYxOt191tw08CKKieYu1dlCalF0fYLsqKHIhkxslFkikVkljK3VlZdpW3dS5You3KUGpLNYoW8jxfGciI/x+JFk/I3fJEsauFD2uAGBt0HTuoJW4SpVZGZZ3l+1q+XOUNWeltPDo+0AyOH4eXFGHLgwvBGS0cDRIUDG9zYjtJveo7cWqUCjv8Acxk5xuSU2qaquvD7On1i5GFxweM/hYiYUMUJ+Wt1QgrtB7AQegoflqtWgP3V7xJXJUk6y8T8TrVV6PjmLDxnEQ7khwokVkaJysarujbqpA0tpRqEUqJDbm/3U2nK5J0aaq28Vk6vEizMXEygqZUEcqIwZY3jVlGltAfCo7cZZqpj29zestytzlFtZpuL72jBUjijWOFQiKLKgAAUDsFqyElwE3JucnJ4tuoNlfCR4UYor3I/DerQDK3m9HPqpwmR7Q/y1JQeI/MCEnUZfHNbwaGYfVXovK8mjxfnnvwPaykEaf27a3h5kyqENd8T99cwZ2MJBqZEaOQ2ulGmC0TRuLVYJmHBq6EM0a1ShKEWQbj6KlaFpCyYG5uaUNA5mAFqlSwOXUVKkF+QCT4VdS0LptCTUIDSEG5q0yMiuKbEAGySLUZQhz1B3W7KiYLK1nIfeHfrTkIaPWn+WxnGPnPzCwjfYYeKnAFuu/JW9r+Feh8seZ5HzyNFBntbzT5v8ueRvLud5q815qcdxXHRmbMzJb7UW4UWC3ZmYkBVUFmJAAJIrcXLsLcdU3RI89stnf3V6NmzFynLJL0oubbwSq28BxFKsq7l6afSL9nppqxVTE4mumKTtFcyOyUDYHBFVQhKB21aBaM1NulGgWcg0aZKE0bd1TMuhhkNbr2a0uQSFmQ4LE0uoQDIwapQIGkNhaoXQBnIGh1qEoLZxe5HdVkoBuVGhIBOiqerHuHsqVL0yeSrQhJIuPopsXgLefp1B8g6UxZFUEuYQQ37KugNMaFdzrAE9lvYPGmaqIVNOtDvX9BnmHzBxv5o+Y+K8s8YnKz8hxcbMJsgYmNAsOSt5ZZgkjhbSWGyNySewXNbHyzc/wB1qGOH8v8A37jG848n0bdXN1J2lVUVNU5dkYYJ9ZSil2nuDiPyqy+bl4jzD+anJf8AEvL8VM2dhYK/dcRx+YS4VsfHVVMhiVtscuR8xwRvTYTXof2ik1K5i4useUXzPJXfOlZjcs7KHyrc1plLO5KOGEpZJNrxRhpT92WpHZESuq2cgm51FZyR5g1wRybTauZHZguCT3uulQEPjkVhR6WQmUC1WogM5sKuhEySIUSRdSPJHU+FLmiJ4iqcBr0lDAF7C9EWDTN3VQaAZ2BqFgEpuDUKEPLXm5HjcZNwZJHyWdeipGhQ3173FJn7yN5sn8vbX7mFNKj21k017IyCpNLAdwF/AaA+ysmOR5/LDkDTXJ9INvG1MjIgk5HKhxVLTNtHZpfce4W60M7ijmZW22V7c3NFtY+xJZtvJJc3TksStZkORkgyZIMSdkIuD3gt6e6qVtzdXVdhny3FjZ4bekrn+q64fgVY+uSrySzfdv6Es2Pjf1H4OFu+VHn8ZyGP8tfhd1CTKNeyyHSvQ+WNRuUSOe+duU7MpPOqdePb1qbOIxZbeNerZ4FUMqhZrSjl1tXMTs7QVDIbgVaKGWMTbXrenAhy3tUAeJyL1CmTQggG9WQwyFO0mgkWsxRLoSKS1QaAze7e/bULA520JFUGhfLINb1KFgcjCxF9etElUlBK33nPOS/+GxlEajvmkJa//lCsZ4z6G2nHTsY4e9cl+SCp/jl3omYs+tr3t7ABWSaVtZVyz+kB5DkMfAhM+QSV+FEUXZ27FUdTeqlNRRn7LZ3b9ykFWmLrgox4yb7BJ+EyDKM3kBtyD8MIN1iB1AXsv40EbVZanmZe730I2nttu62+M8ncf3vur4V1qnhQHPUkG/pve962EannpJcC5fpg5Z+D/Uj5Ey0t9/mvhtfsXLgkh/3tK2OzlpurtNH5nBvbSNsaAga95r2JzsyqENY8Tkn01zE7S0HQtarTBaGeNJqD2UxMEax2ZLiiBoZEBSLmoU0SxWsbaioDQwyDdSKBsiE8+jGltjUL8g66aaUNQ0hfPIApq0EkLJ3IJq6F0Bi51udANRp6qlaBJVaXETcUy5JyeUsAc6UvGdR92ihEte2h239dY9tZvtN35r4HCwsrcV/VKsp+qul9CPkOQEORFg4yCbLmHuQsSoVRpucgHaNPXRTk60Rj7bZ64SuXHphF0bSq5PlFfE6dqoDY+Cyyfjs5xPlkaOBZIrE6Rj66Zag64lbvepw+TZjotr1y7ZPjTlkcZSqD7vTx8dT9NZNDTSS4CfOXdpTExTIPJnKny9+ZHlTm2uFweV46Zttr2TKQm2o7KzrD8afaa/cw1QlHsNyyfDXta1xOXGVQhrCxXDWrmB2sYxnUVaBYwxzYCiyAY3xJDboSPro0CTSMzNovtoijOHftsFqFNGMisSQdDQSRKCvMUK3pFKaGIWZS21HdQ0CTFWVexq0MFU7a+qjTLFfM5HyeIzDu2nYQhB13sCqgdtySLUq66RNn5Zb17y0qVWpOX4U6v2Vr2GOQHxMPZgwGX5aqkGOugO2wC6kADvNSlFgItf3b9b0tCbdZOuFauuFceuHaB4ODNAkuRmFXy8pi+RKAoA+yFF7blFrClwjTMyN9uldcLdlP5dtUiufFyzzdcaVwoc5OTBiruypVhQnarSMB0F7a02V2McTAsbW9eem3Fya/hVfXStM/rFc/KY8kCzQpLKrgFdsTi/rYAfTVrcRbpR+ozpeU3otqcoRpnWcKr+VScq9wvlnlksDA0a23bm2n/qsayLc9XBowL+2t24V+ZGXTV/mjH7Cv8nI2PLHmQm7Qusqn/WRg4+kVm23ijSTyfQ3SeXsw8jwXH8gxucrHgmJ7zJGrfXXuIOsUcsmqSa5DCjANXWC5BHdXMDtjQ4iIYi1QBjKBdLX1/fRZg0wqNMSOY2CC+42AHeez6KOLfIU5LmEMJY/iKjwLC9G8C6mUbA9X17lufqqk0Q5k22JJJ9IqMsV5gVnG33rjs7KVJYhJcxbkqLXHooQqCrKWwOtUMQnyBdtO6oEhXyePNNjNHA6xybo5Edl3DdG4cAi40uKTdg5xovSmJnbO/GzeUpJuNJRdHR0nFxwwariCkcqGu08J/wDAfvv0+bS3C7zXqf2jnd2P+lOta1+ZH/5UBHwspxfLzpHO4sViVIVIJ6DaNw9tXG0/idfT1+0ZLfWFhasRS+83N+3wfkPoePwYH+bHCPmKSyytdpLkWN3YlvppsbaWRj3/ADDcXYaJTen+HBR/pVF7D6csy6+jqayI1oaq46sWZC6WJOvZ2U6JjumdMSs84n3MluwE28LE1kQeJjyda1NwP5O5Umd+U3kzMlO55uG4x3PexxYyfpr3Fl1gmcu3Cpdku0uFOMc1bYRPTxrl7O3tDnGIFg3Wq1ITOixJcnn4sSdOP4/Hk5DkGBdcOArZAASGldiFRdOpN/Clu4qm023l7nB3bjULa+J/E+UUqt+r2BicT5h5dmTkeQXiMcq8bwcaRLMxYi5aeeIFbWOiKD27tauk3xohy3W0sr+3B3Jc7nu9NMZUfVt8tOAU/knyzcNNEuc4G1TyDS5ZUX+ychpNvqtTfkxpjj1E/wDMbtYRnoX/AI0rf+Gle84i8ocNCxGGXwFY3+RhZGRjRXPb8uB0QE+iiVpLIp+bbh+9ST5yjGT9ck37SVfLmbjG/Ec5k4v2tk7jMj3d/wDeN8g0/hdajttPBlfv4T/Wswl2paH3aaR73Fv2APIY/myCVWXLweT3aSI8c+I3qkL5I9q0tq4uXp6w1Ly+SxjOHfG4vVS39JXMjzZn4OX/AEzneHlxslwz4/yZ4JYpowyoCkkjQ3bc1tgW/TvrGlfcXSSdezL20NovJ7d2182zei4L3tSlWPWMVOkafFkqOoPl+YMGxPyspTYMVOHk3FxextGaariNc/LbqlTVB/8Ashj+YVnneHkBY5kSH+GRxGw9KvY1TuxWYf8AxW84W5PtitS9caogk5XjJ3WOHLikY6BVkRjf1Gjhci8mKu+X7q2tU7ckubi0jhzcXvYdNTb9tHU1ba9KkDkEaduoqUDoyJzYWokgXgQObginRjgKkL8npp2UayEvIr3LruRx22uD7RTocRLzNrn6ZM6Tkv0/+QsuT4m4rFQ3/wC7XZ/u17bbOtqPQ5hvFS/LqdnVkmGas8NrPfra2g6m9cvaO40bdAvlORyMeJMDilE/I5ItjRkn5YBIUyOyg2Vbg+qsWUnwNlsNtC5JXLr02lm+NfhS7ZZdlavIb8BwOPw2JHjQMHYjdkTfamke5Z2J7yb26UcImHvt5PcXNTy4LhFLJLpl3FkxWgHuy6HwJFZCNdLMnMuCl7XJ7tTf6KcmCE42YEU/KWwPUFKYijOTJBawRb/7NRogHnvKsQa4Re0WAJ9l6XJEoq1oIOQhw8/HfFyo1mhf4oZVDpcag2Ol7ikuK4mZYvztTU4OjXFNrrlzRW1w0wcePChZnigBWIPY7U3EqgsBooNhQxikjIv35Xrjm83i6Vz4ulXnmAZLNcsUHq/sajQisuz1f9RblRwZK/LyYFlj0bY4DC46GxBFC7aeY61fu2paoSafY3H6GI8jGm4u+VwxYIoYy4NyUkAux23uVOvZppS/l6cje296t3/b3WLeU6KsetNOtfiq1zeSKiyI8iNMiNgVlG9WIIuCL9vspsZVVTRXrMrVyVuWDi6enpQ+dhYeIp0TEbqQn3jpTUxcgLIU60SYp5CHlhZGJ7jr6LmnReDEN4m0z9J53fpy8gn/APNjHsZhXtNr+lE5nvlS/LqdtVlmAaqpc5ONxpc2VSwiRmVBoWY6Ko/2jYVyy5KiO+bXbO/dVtOlWsfpfSOb7BtwHHNhxtmZhWTPyrNkzAGwB1CKNLKosAPXSVGmY3f7rXJQhhCGCX0y6ssuMwRVBBsABpr0FPTNNLPkNseaIfFFc9bsOvsp0WqAMPjz8dFG+BB3agH99Ni0A0zleWjb3IYhqey7a+yjqRHMrzNqwKX6ArbT11CVFuVjZedII4UvbXcxsPovQSRNQr5TE/DWiZtznrboKVIbDEQZ0DKQFPUdQaCo9CfIR1Ygk9KoIWZG9WN9aJFi+ZmJA6W19J7KFoKieDdBdhKuLl5OGltjbZ41103kqbXJ7Vue69Itx0VXN1Nvvrj3G3t3pLxRWh9unFflko146QlmPbWUjRSzMQbdaOIuSBsg6E0aEsQcrf5bW7j++nxRjS4m0j9JJJ/Tj5DLf+gFvR817V7Xa/pI5r5h/uJ9Tt2ss15qh5KEywYkxOsOVjHYejCSQRG/o3XHiK5RfdEuqPony2S1yi/ihPuUYueHXTT8NS3Y6mMAfFfW57aKho5Nt4jjHLsAu3XrpVpC2hxCXMSs8Skg6Fienqp6iLqErFnzj7iKKJe17D670agwWwqH5qJtm5OOE9Og3H0WFNjFpAuRhKcVG3S5hm07e2reBMwTL5KFF+5TT09tC2EkVvKyZZ2Z3a4vppSJOrGxyEuYV1cg+NANQlypFYm1wv11A6CrKkW3U+uiQSAGa+uvrqEAZ3QcnCbHd8iYekb4zWPJP5i6fYbW3jsbi+/GnfGdfqJy2pPW+tZVDRp4H1xRIFg2SPc9NMihMhFyZ+7a3QX+kGsiOTMaSNpX6Tht/Tn5CB/+uQ+12P117Pa/pROab/8A3Eup21WWYBqezS/9FmyUcbsbZk+J/DOs1vXtrld+PhxPobytr9zCL+Ksf61o/wAxfMCOGaJdym6+6fC3ZRJYGmm8RhBFHHJY9vQ30qAN4DmDYkY3/D39RWTHISzKSHFlN3yV94bVRiwAPiAKNFVR9Hx2bi2CGCZm+Edw79RVuLJVHxin/lZDxK5191SdPZVUZAXL4+FYmeXKUG2gGmtC8i6iSdAihSwYWuCKQMTE+dsYdot07qoZESZbrr0I7bVByEeY6nXu0o6EF8s4S1zaokCwB3MnKXv/ACodPTI4+paW4tz7jaalHY04yuL8kcf8a9oUjaa95t6L0407ZkTRJC5MhyD7nopkULZX+WdVhc9wb9mlOjkzHeZtY/THgzcd+n/yHizgBxxWK5A7pF3jr4NXttsqWo9DmG9db8up2fWSYRqbw2TKwpcNV93IR42uf4lI+uuY3Y1R3ja3XbvRuL4JRa9f1cS4eU+UXO4fDyJj948amYgW+8UWcW7wwIpNuTcVULzGwrW5nGOSb0/hzj640LQqbkRoFDA6hibUyhrK4D3AOWcf3hG1j8JPgKfHIWyZppwwAxobjW9gTTUCfScvlBTuxo47C25QPrFW5EoDSchPlQkBIx3tpf8AZQN1CSFWQMKCNvxC/Mc+91FrdLdaFlpCRmx9zS2YD7KjupLQaQqy3WZizrYDQd9VQdFFfzXUMVDW9PX6KtDUJMltSSRbpRIgkzspIEklb7AIVf4m+yB66jdImRt9vK/cjBOmOfJcfVn1B8BGjQvOd00ljIR0HcBUsxksZDvMtxC5JQtKluNdP1y/mdZd4clwBrTWjVPMyLa2okhbRHKdyHw0ogGVrnW/ustu46d/damwVcDHmbgvym4+Tivyu8o8bNYSY3E8dFIB03LjRg93bXuLKpbS7Dle4lquyfaWynGOaj+GkV1UgXLdDeubyWB22NK1H3lzkDxvMz8VI42zlszCuDoHP3kYNraH3u/3qwouktPebrcx+fto3l70aQl3e73OPhX4X2V7AxMuSRAgKAk9CD+6no8+0O8bBaZQJZdoPYop8YVQDbQYONhjU7ZGS3hqaYoUQvWRxYCZ03y2WXYB7zEWv9NQFyI83hsaJgkDtFH9vcBf9tU0GmI+QxUUu0b3iTS50NLYxCediSVX4B2UthoV5UgTs2k9hoRyK/ngF9t9DraoMRXeQkWPeSQgGrHwokGlJtKmfp6UK8rfi5xlvfYn8gG2hvq3soIJynXgbXcSjtrLsxxnL3+xUVI151q3TCjWPBFwnW3joKyjQ8kF2a1xUKOFa7a0SBZHK/ustQXITHCk5flMHiolZ3zcnHxkVRqTLMqae2siyqyS5swL0qRb5G53jcWPB4/GwYv5ePGkUd/4UUKPoFe4gqKhyuTq2wmjBNQXCSxsqgFhbr/a9c4kztiLG0BzIUEDmKaF1lxpj0WRemndbrWLOOFVmbDabr5M3XGMk012fby5NFk8s84nKRyRsrY+XjMy5ONIjIV2sV3JuA3I1vdI61VudSb7ZOw0004P3WvofKXNZKqxLjhZgQe+t+5if9NZikaqUJLgNoORG4PKl1HcSBb10WoQ41RNn+Y8doRFiY77/tEEfvq3JC1BiWfk1AuYyzHqGa5oXIaoibMmnkuj+5G5uFPWlSYxIByMgxElQCOi0DDQjyZSxZ5TbdfaPX7KoeVvl+VxMW8Lt8yUXIhjVnk071UEj1gUp3EjZbfYX7y1JaY/xSaiu5vPuKtmRz5x35g2RH4IUax9LH6qYoOeeRmPcWto6WF4+M5Y07Irh+LPswBpCEOxdAuigaACspKioaKcnKTb4k+P2XqCg/otqlSEIcA3ogGyCdxYt9FXxFSZZfyD8vv5q/PvyJw6rvT+pxZc4HZHhhslj6Pu62G0hquLsNL5hPTt5M22L0r2RzYyqENP/BSxIfltfdfQEVzeR2wt2EyDoCOnaQDr2/8AJSWX6faM8jjMXk/lyy748iL/AA+XGdsqG3Ye7vHQ9tC4rgZu13k7FVXVF5xawf2PtWKGGDzXPcXsi5TDXNiF/wC/YQJcW6b8ZiSAf9Vm9AqoScczIntdpfVbUvlt/DN4f15PrLT9bc43nLiOYjKcdNDkyIPvI4jtdbG3vIbMpvpqBTVdizXXvL79imuLSfxfC+ksn3NkiZZjfeqFfAa6+qjUkzEUG0SnOyHAMUa97Ei5qFenpQVcjNLLLeSw7AQLCgYcVUr3Lcrice6id7O+kcYu8jE/wolyfUKVKaRn7bZ3bybgsFm20orrJ+Fd7EuTk8xyKMqD+m42oVmscllt3ahL66k38KWpSk8qI2ejZ7aj/VuLroT64OXd4fvPJKpcfGw0KY8YUnVmN2Zj2ksTf201QSyMHcbm7fdZy9mXYkqJd1BNnTLbUG9ZUcEYbYod9zk0QDDsRGIFUUw1mAFVSpQOzAUwWwbJa0Z7BUQqR37+gXyv/WvzzzfMci3j8u8XMyNa4E2bIsIt3e4HreeXQbnU8r53cpZpzZsZQEA3769Ozw/EyqiGoDCMe4SqCL+qubyO2pFn46cEgi57PepJbLJjSbVHbUBGuJkhRcsB4HQ37CO6rVAJdAbk+L4zmoyM9IZBbarMimRLm91k27wfEEHxoJW1IzrHmG4staJyS4quD7su51XYLv6TyMDvHg85lrExv8uSSPIC2UL7rZEcr9nQtQ6GsmOe9tTo52INrlqj7IShGvbQD2eZoGaGPlElW9zJNjHf6CYpI1/6NBKNzg0N+fs5Yu1JfhnRfnhN/mBsjE5jMk25XJMke0KVxE/Ds2p6u7TN7CKityfvMYt3tra8Fqr53Hr/ACpQj61IxxOMweMuMKCOOVwd8vvbmBN/eJO5te80cbUVjxMa/v79/wDVlqSyTyX4VlHuRxk7th1B7vD2AUypiYsQZ2l791EkQrHIzruNu0U9C2wBLubUQI0xTsGtVQoIZgy1aKqDyn3reFRiwLKkO1h4DT20UULke6f8u3yf+A/LjzB53lS0nP8AI/h4HN7nGwECgjToZJH9lep8tttRbfM8B55crdUVwR61GgrbnnDmrIageP8AgSubzzO3IsWF8S0plssGJ9mhADo+gqEJh/KPpNGgGcQ/A1Uy0Qt8R9dUEgGf+b6qhAGb+b6vrqBogl+FqgaEPKdfV9dEiMp+d8fqrIQoih+MVYIzh+AVaLJT0qwGQSdaFi2AZfxD+3aKYshcs0bLv0R//wA0eUfRm/8AzZq9js/0zmvmn+4Z3rWcag+qEP/Z' 
        };
        usSpinnerService.stop('detail-spinner');
      // }

      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };

    /* istanbul ignore next */
    this.edit = function () {
      $scope.isEdit = true;

      $scope.currentUser = this.currentUser;
      $scope.drawingEdit = Object.assign({}, this.drawing);
      $scope.patient = this.currentPatient;

      $scope.drawingEdit.date = new Date();
    };

    /* istanbul ignore next */
    this.cancelEdit = function () {
      $scope.isEdit = false;
    };

    /* istanbul ignore next */
    $scope.confirmEdit = function (drawingForm, drawing) {
      $scope.formSubmitted = true;

      if (drawingForm.$valid && $scope.drawingEdit.records) {
        let toUpdate = {
          name: drawing.name,
          date: drawing.date,
          source: drawing.source
        };

        this.drawing = Object.assign(drawing, toUpdate);
        $scope.isEdit = false;
        
        this.drawingsUpdate($stateParams.patientId, toUpdate);
      }
    }.bind(this);

    /* istanbul ignore next */
    this.editDetail = function () {
      $scope.isEditDetail = true;
      // $scope.currentUser = this.currentUser;
      // $scope.drawingEdit = Object.assign({}, this.drawing);
      // $scope.patient = this.currentPatient;

      // $scope.drawingEdit.date = new Date();
    };

    /* istanbul ignore next */
    this.cancelEditDetail = function () {
      $scope.isEditDetail = false;
    };

    /* istanbul ignore next */
    $scope.confirmEditDetail = function (drawingForm, drawing) {
      $scope.formSubmitted = true;

      if (drawingForm.$valid && $scope.drawingEdit.records) {
        let toUpdate = {
          name: drawing.name,
          date: drawing.date,
          source: drawing.source
        };

        this.drawing = Object.assign(drawing, toUpdate);
        $scope.isEdit = false;
        
        this.drawingsUpdate($stateParams.patientId, toUpdate);
      }
    }.bind(this);

    $scope.resizeDrawing = function () {
      serviceRequests.publisher('resizeDrawing', {});
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.drawingsLoad = drawingsActions.get;
    this.drawingsUpdate = drawingsActions.update;
    this.drawingsLoad($stateParams.patientId, $stateParams.detailsIndex);
  }
}

const DrawingsDetailComponent = {
  template: templateDrawingsDetail,
  controller: DrawingsDetailController
};

DrawingsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'drawingsActions', 'usSpinnerService', 'serviceRequests', '$timeout', '$window'];
export default DrawingsDetailComponent;