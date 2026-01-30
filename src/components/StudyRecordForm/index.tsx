import type {
  StudyRecord,
  StudyRecordFormValues,
  StudyRecordUpdate,
} from "@/types/studyRecord";
import { Button, Field, Input, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type Props = {
  onClose: () => void;
  initialValue: StudyRecord | null;
  onCreate: (record: StudyRecordFormValues) => Promise<void>;
  onUpdate: (record: StudyRecordUpdate) => Promise<void>;
};

const StudyRecordForm = ({
  onClose,
  initialValue,
  onCreate,
  onUpdate,
}: Props) => {
  const isEdit = Boolean(initialValue);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StudyRecordFormValues>({
    defaultValues: {
      title: "",
      time: undefined,
    },
  });

  useEffect(() => {
    if (initialValue) {
      reset({
        title: initialValue.title ?? "",
        time: initialValue.time ?? undefined,
      });
    } else {
      reset({
        title: "",
        time: undefined,
      });
    }
  }, [initialValue, reset]);

  const onSubmit = async (data: StudyRecordFormValues) => {
    if (initialValue) {
      await onUpdate({
        id: initialValue.id,
        title: data.title,
        time: data.time,
      });
    } else {
      await onCreate(data);
    }
    onClose();
  };

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
                message: "0より大きい数値を入力してください。",
              },
            })}
          />
          <Field.ErrorText>{errors.time?.message}</Field.ErrorText>
        </Field.Root>

        <Button type="submit" alignSelf="flex-end" loading={isSubmitting}>
          {isEdit ? "更新" : "登録"}
        </Button>
      </Stack>
    </form>
  );
};

export default StudyRecordForm;
