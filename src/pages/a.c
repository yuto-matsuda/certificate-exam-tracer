#include <stdio.h>
#define SIZE 6

void quick_sort(int [], int, int);
void swap(int *, int *);
void print_array(int []);

int main(void) {
    int data[SIZE] = {65, 56, 11, 58, 25, 49};

    print_array(data);
    quick_sort(data, 0, SIZE - 1);
    print_array(data);

    return 0;
}

// 左端の要素を分割要素(pivot)としてクイックソート
void quick_sort(int data[], int left, int right) {
    // ガード節 ... 処理の対象外とする条件を関数の先頭に書いておき、returnで抜ける方法
    if (left >= right) return;  // ソート範囲が妥当か(left < right)を確認

    int lp, rp, pivot;

    pivot = data[left];  // 左端をpivotに設定
    lp = left;
    rp = right + 1;  // 初回の"--rp"で右端の要素が参照されるよう1を加える

    while (lp < rp) {
        while (data[++lp] <= pivot && lp <= rp);  // pivotより大きい要素を左から探索
        while (data[--rp] >  pivot && lp <= rp);  // pivot以下の要素を右から探索
        if (lp < rp) swap(&data[lp], &data[rp]);
    }
    swap(&data[left], &data[rp]);  // ループ終了後、rpは必ずpivot以下の要素を示す => pivotと交換することで分割が完了する

    // ガード節によりif文が不要に
    quick_sort(data, left, rp - 1);   // pivot未満のグループをクイックソート
    quick_sort(data, rp + 1, right);  // pivotより大きいグループをクイックソート
}

void swap(int *p1, int *p2) {
    int tmp;

    tmp = *p1;
    *p1 = *p2;
    *p2 = tmp;
}

void print_array(int data[]) {
    int i;

    for (i = 0; i < SIZE; i++) {
        printf("%5d", data[i]);
    }
    printf("\n");
}