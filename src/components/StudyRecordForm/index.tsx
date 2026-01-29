import { Button, Field, Input, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

// type FormValues = Omit<StudyRecord, "id" | "createdAt" | "updatedAt">;
type StudyRecordFormValues = {
  title: string;
  time: number;
}

const StudyRecordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudyRecordFormValues>();

  const onSubmit = (data: StudyRecordFormValues) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack gap={4} align="flex-start" maxW="sm">
        <Field.Root invalid={!!errors.title}>
          <Field.Label>学習内容</Field.Label>
          <Input
            {...register("title", { required: "学習内容の入力は必須です。" })}
            placeholder="学習内容を入力"
          />
          <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!errors.time}>
          <Field.Label>学習時間</Field.Label>
          <Input
            type="number"
            placeholder="例）2、2.5など"
            {...register("time", { 
              required: "学習時間の入力は必須です。",
              setValueAs: (v) => (v === "" ? undefined : Number(v)),
              min: {
                value: 0.01,
                message: "0より大きい数値を入力してください。"
              }
            })}
          />
          <Field.ErrorText>{errors.time?.message}</Field.ErrorText>
        </Field.Root>

        <Button type="submit" alignSelf="flex-end">
          登録
        </Button>
      </Stack>
    </form>
  );
};

export default StudyRecordForm;
